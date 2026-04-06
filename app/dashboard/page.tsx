import { TenderOfferCard } from '@/components/TenderOfferCard'
import { supabase } from '@/lib/supabase'
import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

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
    const today = new Date()
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(today.getDate() - 30)
    const startdt = thirtyDaysAgo.toISOString().split('T')[0]
    const enddt = today.toISOString().split('T')[0]

    const response = await fetch(
      `https://efts.sec.gov/LATEST/search-index?forms=SC+TO-I,SC+TO-T&dateRange=custom&startdt=${startdt}&enddt=${enddt}&_source=file_date,display_names,adsh,form,root_forms,biz_locations&from=0&size=20`,
      {
        headers: {
          'User-Agent': 'StockSteal contact@stocksteal.com',
          'Accept': 'application/json',
        },
        cache: 'no-store'
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

async function getSubscriptionStatus(userId: string) {
  const { data } = await supabase
    .from('subscribers')
    .select('status')
    .eq('id', userId)
    .single()
  return data?.status === 'active'
}

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ success?: string }> }) {
  const supabaseServer = await createClient()
  const { data: { user } } = await supabaseServer.auth.getUser()

  if (!user) redirect('/login')

  const params = await searchParams
  const [filings, isSubscribed] = await Promise.all([
    getFilings(),
    getSubscriptionStatus(user.id)
  ])

  const visibleFilings = isSubscribed ? filings : filings.slice(0, 1)
  const lockedFilings = isSubscribed ? [] : filings.slice(1)

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <a href="/" style={{ textDecoration: 'none' }}>
              <h1 className="text-xl font-semibold text-gray-900">StockSteal</h1>
            </a>
            <p className="text-xs text-gray-500">Real-time tender offer opportunities</p>
          </div>
          <div className="flex items-center gap-3">
            {!isSubscribed && (
              <SubscribeButton />
            )}
            <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full">
              {filings.length} active filings
            </span>
            <LogoutButton />
          </div>
        </div>
      </header>

      {params.success && (
        <div className="max-w-6xl mx-auto px-6 pt-4">
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm text-green-700">
            Subscription activated successfully. Welcome to StockSteal Pro!
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Latest Tender Offers — SEC EDGAR
          </h2>
        </div>
        <div className="grid gap-4">
          {visibleFilings.map((filing: any) => (
            <TenderOfferCard key={filing.id} filing={filing} />
          ))}

          {lockedFilings.length > 0 && (
            <div className="relative">
              <div style={{ filter: 'blur(4px)', pointerEvents: 'none', userSelect: 'none' }} className="grid gap-4">
                {lockedFilings.map((filing: any) => (
                  <div key={filing.id} className="bg-white border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono font-semibold bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                        {filing.companies[0].match(/\(([A-Z]{2,5})\)/)?.[1] || '—'}
                      </span>
                      <span className="text-xs text-gray-400">{filing.fileDate}</span>
                    </div>
                    <h3 className="font-medium text-gray-900">{filing.companies[0].replace(/\s*\(.*?\)\s*/g, '').trim()}</h3>
                    <p className="text-xs text-gray-400 mt-1">{filing.location} · {filing.form}</p>
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white border border-gray-200 rounded-xl shadow-lg px-8 py-6 text-center max-w-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">Unlock all opportunities</h3>
                  <p className="text-sm text-gray-500 mb-4">Subscribe to StockSteal Pro for $9/month to access all active tender offer analyses.</p>
                  <SubscribeButton />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

function SubscribeButton() {
  return (
    <form action="/api/stripe/checkout" method="POST">
      <button type="submit" className="text-sm px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors">
        Subscribe $9/month →
      </button>
    </form>
  )
}

function LogoutButton() {
  return (
    <form action="/api/auth/logout" method="POST">
      <button type="submit" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
        Sign out
      </button>
    </form>
  )
}