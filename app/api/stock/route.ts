import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const ticker = searchParams.get('ticker')

  if (!ticker) {
    return NextResponse.json({ error: 'Ticker required' }, { status: 400 })
  }

  try {
    const res = await fetch(
      `https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?adjusted=true&apiKey=${process.env.POLYGON_API_KEY}`,
      { next: { revalidate: 900 } }
    )

    if (!res.ok) {
      return NextResponse.json({ error: 'Ticker not found' }, { status: 404 })
    }

    const data = await res.json()

    if (!data.results || data.results.length === 0) {
      return NextResponse.json({ error: 'No data found' }, { status: 404 })
    }

    const result = data.results[0]

    return NextResponse.json({
      ticker,
      price: result.c,
      previousClose: result.o,
      high: result.h,
      low: result.l,
      volume: result.v,
    })

  } catch (error) {
    console.error('Polygon error:', error)
    return NextResponse.json({ error: 'Failed to fetch price' }, { status: 500 })
  }
}