import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

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
    return {
      price: result.c,
      high: result.h,
      low: result.l,
      volume: result.v,
    }
  } catch {
    return null
  }
}

async function fetchFilingDocument(adsh: string, companies: string[]): Promise<string> {
  try {
    const cikMatch = companies[0].match(/CIK (\d+)/)
    if (!cikMatch) return ''

    const cik = cikMatch[1].replace(/^0+/, '')
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

  } catch (error) {
    console.error('Error fetching filing document:', error)
    return ''
  }
}

export async function POST(request: Request) {
  try {
    const { filing } = await request.json()

    const ticker = filing.companies[0].match(/\(([A-Z]{2,5})\)/)?.[1] || null

    const [documentText, stockPrice] = await Promise.all([
      fetchFilingDocument(filing.adsh, filing.companies),
      ticker ? getStockPrice(ticker) : Promise.resolve(null)
    ])

    const hasDocument = documentText.length > 100

    const priceContext = stockPrice
      ? `Current market data (previous close):
- Ticker: ${ticker}
- Close price: $${stockPrice.price?.toFixed(2)}
- Day high: $${stockPrice.high?.toFixed(2)}
- Day low: $${stockPrice.low?.toFixed(2)}
- Volume: ${stockPrice.volume?.toLocaleString()} shares`
      : ticker
        ? `Current market price not available for ${ticker}.`
        : `No ticker symbol found. This may be a private fund or unlisted entity.`

    const prompt = hasDocument
      ? `You are a financial analyst specializing in special situations and corporate actions for retail investors.

Analyze this SEC tender offer filing document and extract key information:

Company: ${filing.companies.join(' / ')}
Form type: ${filing.form}
Filed: ${filing.fileDate}
Location: ${filing.location}

${priceContext}

FILING DOCUMENT CONTENT:
${documentText}

From the document and market data above:
1. Extract the exact tender offer price or price range (if Dutch auction)
2. Calculate the premium over current market price if both are available
3. Extract the expiration date of the offer
4. Extract total shares or dollar amount being purchased
5. Identify any conditions that could cancel the offer
6. Give a clear buy/watch/avoid recommendation with reasoning
7. List key risks specific to this offer

Format with clear sections. Include specific numbers. Keep under 250 words. Write for a retail investor.`
      : `You are a financial analyst specializing in special situations and corporate actions for retail investors.

Analyze this SEC tender offer filing:

Company: ${filing.companies.join(' / ')}
Form type: ${filing.form} (${filing.form === 'SC TO-T' ? 'Third-party tender offer' : 'Issuer tender offer'})
Filed: ${filing.fileDate}
Location: ${filing.location}

${priceContext}

Note: Full document content unavailable. Provide a general analysis based on filing type and company information.
Cover: what this means for shareholders, typical opportunity assessment, key risks, and what to watch for next. Keep under 200 words.`

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }]
    })

    const analysis = message.content[0].type === 'text'
      ? message.content[0].text
      : 'Analysis unavailable'

    return NextResponse.json({
      analysis,
      hasDocument,
      ticker,
      stockPrice
    })

  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze filing' },
      { status: 500 }
    )
  }
}