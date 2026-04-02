import { TenderOfferCard } from '@/components/TenderOfferCard'

async function getFilings() {
  const res = await fetch('http://localhost:3000/api/edgar', {
    cache: 'no-store'
  })
  const data = await res.json()
  return data.filings || []
}

export default async function Home() {
  const filings = await getFilings()

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
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

      {/* Content */}
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