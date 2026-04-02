import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const response = await fetch(
      'https://efts.sec.gov/LATEST/search-index?forms=SC+TO-I,SC+TO-T&dateRange=custom&startdt=2025-01-01&enddt=2025-12-31&_source=file_date,display_names,adsh,form,root_forms,biz_locations&from=0&size=40',
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
      })
    }

    return NextResponse.json({
      saved: newFilings.length,
      message: `Saved ${newFilings.length} new filings. Run /api/analyze-pending to process them.`
    })

  } catch (error) {
    console.error('Poll error:', error)
    return NextResponse.json({ error: 'Poll failed' }, { status: 500 })
  }
}