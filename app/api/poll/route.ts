import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

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
    const cutoffDate = thirtyDaysAgo.toISOString().split('T')[0]
    const { data: oldFilings } = await supabaseAdmin
      .from('filings')
      .select('id')
      .lt('file_date', cutoffDate)

    if (oldFilings && oldFilings.length > 0) {
      const oldIds = oldFilings.map((f: any) => f.id)
      await supabaseAdmin.from('analyses').delete().in('filing_id', oldIds)
      await supabaseAdmin.from('filings').delete().lt('file_date', cutoffDate)
    }

    // Step 2: Fetch recent filings from EDGAR
    const response = await fetch(
      `https://efts.sec.gov/LATEST/search-index?forms=SC+TO-I,SC+TO-T,SC+13E-4,SC+13E-3&dateRange=custom&startdt=${startdt}&enddt=${enddt}&_source=file_date,display_names,adsh,form,root_forms,biz_locations&from=0&size=40`,
      {
        headers: {
          'User-Agent': 'StockSteal contact@stocksteal.com',
          'Accept': 'application/json',
        }
      }
    )

    const data = await response.json()

    const filings = data.hits.hits
      .filter((hit: any) =>
        hit._source.form === 'SC TO-I' ||
        hit._source.form === 'SC TO-T'
      )
      .map((hit: any) => ({
        id: hit._id,
        adsh: hit._source.adsh,
        form: hit._source.form,
        fileDate: hit._source.file_date,
        companies: hit._source.display_names,
        location: hit._source.biz_locations?.[0] || 'N/A',
      }))
      .filter((f: any) =>
        f.companies.some((c: string) => /\([A-Z]{2,5}\)/.test(c))
      )

    // Step 3: Save only new filings
    const { data: existingFilings } = await supabaseAdmin
      .from('filings')
      .select('id')

    const existingIds = new Set(existingFilings?.map((f: any) => f.id) || [])
    const newFilings = filings.filter((f: any) => !existingIds.has(f.id))

    for (const filing of newFilings) {
      await supabaseAdmin.from('filings').insert({
        id: filing.id,
        adsh: filing.adsh,
        form: filing.form,
        file_date: filing.fileDate,
        companies: filing.companies,
        location: filing.location,
        event_type: filing.form === 'SC 13E-3' ? 'going_private' : 
              filing.form === 'SC 13E-4' ? 'issuer_tender_small' : 'tender_offer',
      })
    }

    return NextResponse.json({
      period: `${startdt} to ${enddt}`,
      deleted: oldFilings?.length || 0,
      saved: newFilings.length,
      total: filings.length,
      message: `Deleted ${oldFilings?.length || 0} old filings. Saved ${newFilings.length} new filings.`
    })

  } catch (error) {
    console.error('Poll error:', error)
    return NextResponse.json({ error: 'Poll failed' }, { status: 500 })
  }
}