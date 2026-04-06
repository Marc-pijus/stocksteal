import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

const POLYGON_API_KEY = process.env.POLYGON_API_KEY

async function getMarketCap(ticker: string): Promise<number | null> {
  try {
    const res = await fetch(
      `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${POLYGON_API_KEY}`
    )
    if (!res.ok) return null
    const data = await res.json()
    return data.results?.market_cap || null
  } catch {
    return null
  }
}

function getEventType(form: string): string {
  if (form === 'SC 13E-3') return 'going_private'
  if (form === 'SC 13E-4') return 'issuer_tender_small'
  if (form === 'SC TO-T') return 'third_party_tender'
  if (form === '8-K') return 'buyback'
  return 'tender_offer'
}

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  const cronHeader = request.headers.get('x-vercel-cron-1')

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}` && !cronHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const today = new Date()
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(today.getDate() - 30)
    const startdt = thirtyDaysAgo.toISOString().split('T')[0]
    const enddt = today.toISOString().split('T')[0]

    // Step 1: Delete filings older than 30 days
    const { data: oldFilings } = await supabaseAdmin
      .from('filings')
      .select('id')
      .lt('file_date', startdt)

    if (oldFilings && oldFilings.length > 0) {
      const oldIds = oldFilings.map((f: any) => f.id)
      await supabaseAdmin.from('analyses').delete().in('filing_id', oldIds)
      await supabaseAdmin.from('filings').delete().lt('file_date', startdt)
    }

    // Step 2: Fetch tender offers and going-private from EDGAR
    const tendersResponse = await fetch(
      `https://efts.sec.gov/LATEST/search-index?forms=SC+TO-I,SC+TO-T,SC+13E-4,SC+13E-3&dateRange=custom&startdt=${startdt}&enddt=${enddt}&_source=file_date,display_names,adsh,form,root_forms,biz_locations&from=0&size=40`,
      {
        headers: {
          'User-Agent': 'StockSteal contact@stocksteal.com',
          'Accept': 'application/json',
        }
      }
    )
    const tendersData = await tendersResponse.json()

    const tenderFilings = tendersData.hits.hits
      .filter((hit: any) =>
        ['SC TO-I', 'SC TO-T', 'SC 13E-4', 'SC 13E-3'].includes(hit._source.form)
      )
      .map((hit: any) => ({
        id: hit._id,
        adsh: hit._source.adsh,
        form: hit._source.form,
        fileDate: hit._source.file_date,
        companies: hit._source.display_names,
        location: hit._source.biz_locations?.[0] || 'N/A',
        event_type: getEventType(hit._source.form),
      }))
      .filter((f: any) =>
        f.companies.some((c: string) => /\([A-Z]{2,5}\)/.test(c))
      )

    // Step 3: Fetch 8-K buyback announcements from EDGAR
    const buybacksResponse = await fetch(
      `https://efts.sec.gov/LATEST/search-index?q=%22repurchase+program%22+%22common+stock%22&forms=8-K&dateRange=custom&startdt=${startdt}&enddt=${enddt}&_source=file_date,display_names,adsh,form,biz_locations&from=0&size=40`,
      {
        headers: {
          'User-Agent': 'StockSteal contact@stocksteal.com',
          'Accept': 'application/json',
        }
      }
    )
    const buybacksData = await buybacksResponse.json()

    const buybackFilings = buybacksData.hits?.hits
      ?.filter((hit: any) => hit._source.form === '8-K')
      .map((hit: any) => ({
        id: hit._id,
        adsh: hit._source.adsh,
        form: hit._source.form,
        fileDate: hit._source.file_date,
        companies: hit._source.display_names,
        location: hit._source.biz_locations?.[0] || 'N/A',
        event_type: 'buyback',
      }))
      .filter((f: any) =>
        f.companies.some((c: string) => /\([A-Z]{2,5}\)/.test(c))
      ) || []

    const allFilings = [...tenderFilings, ...buybackFilings]

    // Step 4: Save only new filings
    const { data: existingFilings } = await supabaseAdmin
      .from('filings')
      .select('id')

    const existingIds = new Set(existingFilings?.map((f: any) => f.id) || [])
    const newFilings = allFilings.filter((f: any) => !existingIds.has(f.id))

    let savedCount = 0
    let skippedCount = 0

    for (const filing of newFilings) {
      // For 8-K buybacks, verify market cap > $1B
      if (filing.event_type === 'buyback') {
        const ticker = filing.companies[0].match(/\(([A-Z]{2,5})\)/)?.[1]
        if (!ticker) {
          skippedCount++
          continue
        }
        const marketCap = await getMarketCap(ticker)
        if (!marketCap || marketCap < 1_000_000_000) {
          skippedCount++
          continue
        }
      }

      await supabaseAdmin.from('filings').insert({
        id: filing.id,
        adsh: filing.adsh,
        form: filing.form,
        file_date: filing.fileDate,
        companies: filing.companies,
        location: filing.location,
        event_type: filing.event_type,
      })
      savedCount++
    }

    return NextResponse.json({
      period: `${startdt} to ${enddt}`,
      deleted: oldFilings?.length || 0,
      saved: savedCount,
      skipped: skippedCount,
      total: allFilings.length,
      message: `Deleted ${oldFilings?.length || 0} old filings. Saved ${savedCount} new filings. Skipped ${skippedCount} (market cap < $1B or no ticker).`
    })

  } catch (error) {
    console.error('Poll error:', error)
    return NextResponse.json({ error: 'Poll failed' }, { status: 500 })
  }
}