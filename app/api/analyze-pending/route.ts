import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { supabaseAdmin } from '@/lib/supabase'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

async function getStockPrice(ticker: string) {
  try {
    const res = await fetch(
      `https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?adjusted=true&apiKey=${process.env.POLYGON_API_KEY}`
    )
    if (!res.ok) return null
    const data = await res.json()
    if (!data.results || data.results.length === 0) return null
    const r = data.results[0]
    return { price: r.c, high: r.h, low: r.l, volume: r.v }
  } catch { return null }
}

async function fetchFilingDocument(adsh: string, cik: string): Promise<string> {
  try {
    const adshFormatted = adsh.replace(/-/g, '')
    const indexRes = await fetch(
      `https://www.sec.gov/Archives/edgar/data/${cik}/${adshFormatted}/${adsh}-index.htm`,
      { headers: { 'User-Agent': 'StockSteal contact@stocksteal.com' } }
    )
    if (!indexRes.ok) return ''
    const indexHtml = await indexRes.text()
    const docMatch =
      indexHtml.match(/href="([^"]*\.htm[^"]*)"[^>]*>[^<]*SC TO/i) ||
      indexHtml.match(/href="([^"]*sctoi[^"]*\.htm[^"]*)"/i) ||
      indexHtml.match(/href="([^"]*scto[^"]*\.htm[^"]*)"/i)
    if (!docMatch) return ''
    const docUrl = docMatch[1].startsWith('http')
      ? docMatch[1]
      : `https://www.sec.gov${docMatch[1]}`
    const docRes = await fetch(docUrl, {
      headers: { 'User-Agent': 'StockSteal contact@stocksteal.com' }
    })
    if (!docRes.ok) return ''
    const html = await docRes.text()
    return html
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 8000)
  } catch { return '' }
}

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: analyzedIds } = await supabaseAdmin
    .from('analyses')
    .select('filing_id')

  const analyzed = new Set(analyzedIds?.map((a: any) => a.filing_id) || [])

  const { data: allFilings } = await supabaseAdmin
    .from('filings')
    .select('*')
    .order('file_date', { ascending: false })

  const pending = (allFilings || []).filter((f: any) => !analyzed.has(f.id))

  if (pending.length === 0) {
    return NextResponse.json({ message: 'No pending filings to analyze' })
  }

  const filing = pending[0]
  const ticker = filing.companies[0].match(/\(([A-Z]{2,5})\)/)?.[1] || null
  const cikMatch = filing.companies[0].match(/CIK (\d+)/)
  const cik = cikMatch ? cikMatch[1].replace(/^0+/, '') : null

  const [documentText, stockPrice] = await Promise.all([
    cik ? fetchFilingDocument(filing.adsh, cik) : Promise.resolve(''),
    ticker ? getStockPrice(ticker) : Promise.resolve(null)
  ])

  const hasDocument = documentText.length > 100
  const priceContext = stockPrice
    ? `Current market data: Close $${stockPrice.price?.toFixed(2)}, High $${stockPrice.high?.toFixed(2)}, Low $${stockPrice.low?.toFixed(2)}`
    : `Market price not available for ${ticker}.`

  const prompt = hasDocument
    ? `You are a financial analyst for retail investors.

Analyze this SEC tender offer:
Company: ${filing.companies.join(' / ')}
Form: ${filing.form}
Filed: ${filing.file_date}
${priceContext}

FILING DOCUMENT:
${documentText}

Extract: exact offer price, premium over market price, expiration date, total shares/amount, cancellation conditions.
Give BUY/WATCH/AVOID recommendation with reasoning.
Max 250 words. Use clear sections with specific numbers.`
    : `Analyze this SEC tender offer for retail investors:
Company: ${filing.companies.join(' / ')}
Form: ${filing.form}
Filed: ${filing.file_date}
${priceContext}
Cover: what this means, opportunity assessment, key risks, what to watch. Max 200 words.`

  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 500,
    messages: [{ role: 'user', content: prompt }]
  })

  const analysis = message.content[0].type === 'text'
    ? message.content[0].text
    : 'Analysis unavailable'

  await supabaseAdmin.from('analyses').upsert({
    filing_id: filing.id,
    analysis,
    has_document: hasDocument,
    ticker,
    market_price: stockPrice?.price || null,
    updated_at: new Date().toISOString()
  }, { onConflict: 'filing_id' })

  return NextResponse.json({
    processed: filing.companies[0],
    ticker,
    hasDocument,
    marketPrice: stockPrice?.price,
    pending: pending.length - 1
  })
}