import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { supabaseAdmin } from '@/lib/supabase'
import { sendAlertEmail } from '@/lib/email'

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

async function fetchFilingDocument(adsh: string, cik: string, form: string): Promise<string> {
  try {
    const adshFormatted = adsh.replace(/-/g, '')
    const indexRes = await fetch(
      `https://www.sec.gov/Archives/edgar/data/${cik}/${adshFormatted}/${adsh}-index.htm`,
      { headers: { 'User-Agent': 'StockSteal contact@stocksteal.com' } }
    )
    if (!indexRes.ok) return ''
    const indexHtml = await indexRes.text()

    let docMatch

    if (form === '8-K') {
      docMatch =
        indexHtml.match(/href="([^"]*ex99[^"]*\.htm[^"]*)"/i) ||
        indexHtml.match(/href="([^"]*ex-99[^"]*\.htm[^"]*)"/i) ||
        indexHtml.match(/href="([^"]*exhibit99[^"]*\.htm[^"]*)"/i) ||
        indexHtml.match(/href="([^"]*ex99[^"]*\.txt[^"]*)"/i)
    } else {
      docMatch =
        indexHtml.match(/href="([^"]*\.htm[^"]*)"[^>]*>[^<]*SC TO/i) ||
        indexHtml.match(/href="([^"]*sctoi[^"]*\.htm[^"]*)"/i) ||
        indexHtml.match(/href="([^"]*scto[^"]*\.htm[^"]*)"/i) ||
        indexHtml.match(/href="([^"]*13e[^"]*\.htm[^"]*)"/i) ||
        indexHtml.match(/href="([^"]*\.htm[^"]*)"/i)
    }

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

function getEventContext(form: string, lang: 'en' | 'es'): string {
  if (lang === 'es') {
    if (form === 'SC 13E-3') return 'Esta es una transacción de PRIVATIZACIÓN (going-private). Un accionista mayoritario o la dirección ofrece comprar las acciones públicas para retirar la empresa de bolsa. Suele implicar una prima significativa sobre el precio de mercado.'
    if (form === 'SC 13E-4') return 'Esta es una OFERTA DE RECOMPRA DIRECTA de una empresa pequeña que recompra sus propias acciones directamente de los accionistas a un precio fijo, normalmente por encima del precio de mercado.'
    if (form === 'SC TO-T') return 'Esta es una OFERTA DE COMPRA DE TERCEROS donde una empresa externa ofrece adquirir acciones de la compañía objetivo, normalmente a un precio premium.'
    if (form === '8-K') return 'Este es un ANUNCIO DE PROGRAMA DE RECOMPRA DE ACCIONES (buyback). La empresa anuncia que va a recomprar sus propias acciones en el mercado abierto. NO hay precio de oferta fijo ni fecha de vencimiento. Es una señal alcista que indica que la directiva cree que las acciones están infravaloradas.'
    return 'Esta es una OFERTA DE RECOMPRA donde la empresa recompra sus propias acciones directamente de los accionistas a un precio fijo.'
  } else {
    if (form === 'SC 13E-3') return 'This is a GOING-PRIVATE transaction. A controlling shareholder or management is offering to buy out public shareholders to delist the company from the stock exchange. These typically involve a significant premium over market price.'
    if (form === 'SC 13E-4') return 'This is an ISSUER TENDER OFFER by a smaller company repurchasing its own shares directly from shareholders at a fixed price, typically above current market price.'
    if (form === 'SC TO-T') return 'This is a THIRD-PARTY TENDER OFFER where an external company is offering to acquire shares of the target company, typically at a premium price.'
    if (form === '8-K') return 'This is a SHARE BUYBACK PROGRAM announcement. The company announces it will repurchase its own shares in the open market. There is NO fixed offer price or expiration date. This is a bullish signal indicating management believes the stock is undervalued.'
    return 'This is an ISSUER TENDER OFFER where the company is repurchasing its own shares directly from shareholders at a fixed price.'
  }
}

async function generateAnalysis(
  filing: any,
  documentText: string,
  stockPrice: any,
  lang: 'en' | 'es'
): Promise<string> {
  const hasDocument = documentText.length > 100
  const priceContext = stockPrice
    ? `Current market data: Close $${stockPrice.price?.toFixed(2)}, High $${stockPrice.high?.toFixed(2)}, Low $${stockPrice.low?.toFixed(2)}`
    : `Market price not available.`

  const langInstruction = lang === 'es'
    ? 'Write the entire analysis in Spanish. Use financial terminology appropriate for retail investors in Spain and Latin America. Translate BUY/WATCH/AVOID as COMPRAR/VIGILAR/EVITAR.'
    : 'Write the entire analysis in English.'

  const eventContext = getEventContext(filing.form, lang)

  let prompt: string

  if (filing.form === '8-K') {
    prompt = `You are a financial analyst for retail investors. ${langInstruction}

Event type context: ${eventContext}

Analyze this share buyback announcement:
Company: ${filing.companies.join(' / ')}
Form: ${filing.form}
Filed: ${filing.file_date}
${priceContext}

${hasDocument ? `PRESS RELEASE CONTENT:\n${documentText}` : ''}

Extract and analyze:
1. Total buyback amount authorized (in dollars)
2. Percentage of float or shares outstanding this represents
3. Duration of the buyback program
4. Why management is doing this now
5. Whether this is a new program or extension of existing one
6. BUY/WATCH/AVOID signal based on buyback size and market context

Do NOT look for a fixed offer price — this is an open market repurchase program.
Max 250 words. Use clear sections.`
  } else if (hasDocument) {
    prompt = `You are a financial analyst for retail investors. ${langInstruction}

Event type context: ${eventContext}

Analyze this SEC filing:
Company: ${filing.companies.join(' / ')}
Form: ${filing.form}
Filed: ${filing.file_date}
${priceContext}

FILING DOCUMENT:
${documentText}

Extract: exact offer price, premium over market price, expiration date, total shares/amount, cancellation conditions.
Give COMPRAR/VIGILAR/EVITAR (or BUY/WATCH/AVOID) recommendation with reasoning.
Max 250 words. Use clear sections with specific numbers.`
  } else {
    prompt = `Analyze this SEC filing for retail investors. ${langInstruction}

Event type context: ${eventContext}

Company: ${filing.companies.join(' / ')}
Form: ${filing.form}
Filed: ${filing.file_date}
${priceContext}
Cover: what this means, opportunity assessment, key risks, what to watch. Max 200 words.`
  }

  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 500,
    messages: [{ role: 'user', content: prompt }]
  })

  return message.content[0].type === 'text'
    ? message.content[0].text
    : lang === 'es' ? 'Análisis no disponible' : 'Analysis unavailable'
}

function getEventType(form: string): string {
  if (form === 'SC 13E-3') return 'going_private'
  if (form === 'SC 13E-4') return 'issuer_tender_small'
  if (form === 'SC TO-T') return 'third_party_tender'
  if (form === '8-K') return 'buyback'
  return 'tender_offer'
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
    cik ? fetchFilingDocument(filing.adsh, cik, filing.form) : Promise.resolve(''),
    ticker ? getStockPrice(ticker) : Promise.resolve(null)
  ])

  const hasDocument = documentText.length > 100

  const [analysis, analysisEs] = await Promise.all([
    generateAnalysis(filing, documentText, stockPrice, 'en'),
    generateAnalysis(filing, documentText, stockPrice, 'es'),
  ])

  await supabaseAdmin.from('analyses').upsert({
    filing_id: filing.id,
    analysis,
    analysis_es: analysisEs,
    has_document: hasDocument,
    ticker,
    market_price: stockPrice?.price || null,
    updated_at: new Date().toISOString()
  }, { onConflict: 'filing_id' })

  const { data: subscribers } = await supabaseAdmin
    .from('subscribers')
    .select('email')
    .eq('status', 'active')

  if (subscribers && subscribers.length > 0) {
    const emails = subscribers.map((s: any) => s.email).filter(Boolean)
    if (emails.length > 0) {
      await sendAlertEmail({
        to: emails,
        ticker,
        company: filing.companies[0].replace(/\s*\(.*?\)\s*/g, '').trim(),
        form: filing.form,
        marketPrice: stockPrice?.price || null,
        analysis,
        hasDocument,
      })
    }
  }

  return NextResponse.json({
    processed: filing.companies[0],
    ticker,
    form: filing.form,
    eventType: getEventType(filing.form),
    hasDocument,
    marketPrice: stockPrice?.price,
    pending: pending.length - 1
  })
}