import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { supabaseAdmin } from '@/lib/supabase'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

async function getStockPrice(ticker: string) {
  try {
    const res = await fetch(
      `https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?adjusted=true&apiKey=${process.env.POLYGON_API_KEY}`
    )
    if (!res.ok) return null
    const data = await res.json()
    if (!data.results || data.results.length === 0) return null
    const result = data.results[0]
    return { price: result.c, high: result.h, low: result.l, volume: result.v }
  } catch {
    return null
  }
}

async function fetchFilingDocument(adsh: string, cik: string): Promise<string> {
  try {
    const adshFormatted = adsh.replace(/-/g, '')
    const filingIndexUrl = `https://www.sec.gov/Archives/edgar/data/${cik}/${adshFormatted}/${adsh}-index.htm`
    const indexRes = await fetch(filingIndexUrl, {
      headers: { 'User-Agent': 'StockSteal contact@stocksteal.com' }
    })
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
    const text = html
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
    return text.slice(0, 8000)
  } catch {
    return ''
  }
}

async function analyzeAndSave(filing: any) {
  const ticker = filing.companies[0].match(/\(([A-Z]{2,5})\)/)?.[1] || null
  const cikMatch = filing.companies[0].match(/CIK (\d+)/)
  const cik = cikMatch ? cikMatch[1].replace(/^0+/, '') : null

  const [documentText, stockPrice] = await Promise.all([
    cik ? fetchFilingDocument(filing.adsh, cik) : Promise.resolve(''),
    ticker ? getStockPrice(ticker) : Promise.resolve(null)
  ])

  const hasDocument = documentText.length > 100

  const priceContext = stockPrice
    ? `Current market data: Close price $${stockPrice.price?.toFixed(2)}, High $${stockPrice.high?.toFixed(2)}, Low $${stockPrice.low?.toFixed(2)}`
    : ticker ? `Market price not available for ${ticker}.` : 'Unlisted entity.'

  const prompt = hasDocument
    ? `You are a financial analyst specializing in special situations for retail investors.

Analyze this SEC tender offer:
Company: ${filing.companies.join(' / ')}
Form: ${filing.form}
Filed: ${filing.fileDate}
${priceContext}

FILING DOCUMENT:
${documentText}

Extract and analyze:
1. Exact tender offer price or range
2. Premium over current market price if available
3. Expiration date
4. Total shares or dollar amount
5. Conditions that could cancel the offer
6. Clear BUY/WATCH/AVOID recommendation with reasoning
7. Key risks

Use clear sections, specific numbers, max 250 words. Write for retail investors.`
    : `Analyze this SEC tender offer for retail investors:
Company: ${filing.companies.join(' / ')}
Form: ${filing.form} (${filing.form === 'SC TO-T' ? 'Third-party offer' : 'Issuer buyback'})
Filed: ${filing.fileDate}
${priceContext}

Cover: what this means for shareholders, opportunity assessment, key risks, what to watch. Max 200 words.`

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

  return { analysis, hasDocument, ticker, stockPrice }
}

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const response = await fetch(
      'https://efts.sec.gov/LATEST/search-index?forms=SC+TO-I,SC+TO-T&dateRange=custom&startdt=2025-01-01&enddt=2025-12-31&_source=file_date,display_names,adsh,form,root_forms,biz_locations&from=0&size=5',
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

    const { data: existingFilings } = await supabaseAdmin
      .from('filings')
      .select('id')

    const existingIds = new Set(existingFilings?.map((f: any) => f.id) || [])
    const newFilings = filings.filter((f: any) => !existingIds.has(f.id))

    console.log(`Found ${newFilings.length} new filings`)

    const results = []
    for (const filing of newFilings) {
      await supabaseAdmin.from('filings').insert({
        id: filing.id,
        adsh: filing.adsh,
        form: filing.form,
        file_date: filing.fileDate,
        companies: filing.companies,
        location: filing.location,
      })

      const result = await analyzeAndSave(filing)
      results.push({ filing: filing.companies[0], ...result })

      
    }

    return NextResponse.json({
      processed: newFilings.length,
      results
    })

  } catch (error) {
    console.error('Cron error:', error)
    return NextResponse.json({ error: 'Cron failed' }, { status: 500 })
  }
}
