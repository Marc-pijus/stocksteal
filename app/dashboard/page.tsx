import { supabase } from '@/lib/supabase'
import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { DashboardClient } from '@/components/DashboardClient'

export const dynamic = 'force-dynamic'

async function getFilings() {
  const { data: filings, error } = await supabase
    .from('filings')
    .select(`
      *,
      analyses!analyses_filing_id_fkey (
        analysis,
        analysis_es,
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

  return (
    <DashboardClient
      filings={filings}
      isSubscribed={isSubscribed}
      showSuccess={!!params.success}
    />
  )
}