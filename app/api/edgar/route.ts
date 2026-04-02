import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch(
      'https://efts.sec.gov/LATEST/search-index?forms=SC+TO-I,SC+TO-T&dateRange=custom&startdt=2025-01-01&enddt=2025-12-31&_source=file_date,display_names,adsh,form,root_forms,biz_locations,sics&from=0&size=20',
      {
        headers: {
          'User-Agent': 'StockSteal contact@stocksteal.com',
          'Accept': 'application/json',
        },
        next: { revalidate: 300 }
      }
    )

    if (!response.ok) {
      throw new Error(`EDGAR responded with ${response.status}`)
    }

    const data = await response.json()

    // Extraer solo los filings principales (no anexos)
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
        edgarUrl: `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&filenum=&type=${hit._source.form}&dateb=&owner=include&count=10&search_text=`
      }))

    return NextResponse.json({ 
      total: data.hits.total.value,
      filings 
    })

  } catch (error) {
    console.error('EDGAR fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch from EDGAR' },
      { status: 500 }
    )
  }
}