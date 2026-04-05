import { TenderOfferCard } from '@/components/TenderOfferCard'
import { supabase } from '@/lib/supabase'

async function getFilings() {
  const { data: filings, error } = await supabase
    .from('filings')
    .select(`
      *,
      analyses!analyses_filing_id_fkey (
        analysis,
        has_document,
        ticker,
        market_price,
        updated_at
      )
    `)
    .order('file_date', { ascending: false })
    .limit(50)

  

  if (error || !filings || filings.length === 0) {
    const response = await fetch(
      'https://efts.sec.gov/LATEST/search-index?forms=SC+TO-I,SC+TO-T&dateRange=custom&startdt=2025-01-01&enddt=2025-12-31&_source=file_date,display_names,adsh,form,root_forms,biz_locations&from=0&size=20',
      {
        headers: {
          'User-Agent': 'StockSteal contact@stocksteal.com',
          'Accept': 'application/json',
        },
        next: { revalidate: 300 }
      }
    )
    const data = await response.json()
    return data.hits.hits
      .filter((hit: any) =>
        (hit._source.form === 'SC TO-I' || hit._source.form === 'SC TO-T') &&
        hit._source.display_names.some((c: string) => /\([A-Z]{2,5}\)/.test(c))
      )
      .map((hit: any) => ({
        id: hit._id,
        adsh: hit._source.adsh,
        form: hit._source.form,
        fileDate: hit._source.file_date,
        companies: hit._source.display_names,
        location: hit._source.biz_locations?.[0] || 'N/A',
        analysis: null,
      }))
  }

  return filings
    .filter((f: any) =>
      f.companies.some((c: string) => /\([A-Z]{2,5}\)/.test(c))
    )
    .map((f: any) => ({
      id: f.id,
      adsh: f.adsh,
      form: f.form,
      fileDate: f.file_date,
      companies: f.companies,
      location: f.location,
      analysis: f.analyses?.[0] || null,
    }))
}

export default async function Home() {
  const filings = await getFilings()

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">StockSteal</h1>
            <p className="text-xs text-gray-500">Real-time tender offer opportunities</p>
          </div>
          <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full">
            {filings.length} active filings
          </span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Latest Tender Offers — SEC EDGAR
          </h2>
        </div>
        <div className="grid gap-4">
          {filings.map((filing: any) => (
            <TenderOfferCard key={filing.id} filing={filing} />
          ))}
        </div>
      </div>
    </main>
  )
}