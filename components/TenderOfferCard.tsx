'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

interface Filing {
  id: string
  adsh: string
  form: string
  fileDate: string
  companies: string[]
  location: string
  edgarUrl: string
}

interface StockPrice {
  price: number
  high: number
  low: number
  volume: number
}

function extractTicker(company: string): string | null {
  const match = company.match(/\(([A-Z]{2,5})\)/)
  return match ? match[1] : null
}

function extractName(company: string): string {
  return company.replace(/\s*\(.*?\)\s*/g, '').trim()
}

function daysAgo(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Yesterday'
  return `${diff} days ago`
}

export function TenderOfferCard({ filing }: { filing: Filing }) {
  const [analyzing, setAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [hasDocument, setHasDocument] = useState<boolean | null>(null)
  const [stockPrice, setStockPrice] = useState<StockPrice | null>(null)

  const mainCompany = filing.companies[0]
  const acquirer = filing.companies[1]
  const ticker = extractTicker(mainCompany)
  const name = extractName(mainCompany)
  const isThirdParty = filing.form === 'SC TO-T'

  async function handleAnalyze() {
    setAnalyzing(true)
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filing })
      })
      const data = await res.json()
      setAnalysis(data.analysis)
      setHasDocument(data.hasDocument)
      if (data.stockPrice) setStockPrice(data.stockPrice)
    } catch (e) {
      setAnalysis('Analysis unavailable. Please try again.')
    } finally {
      setAnalyzing(false)
    }
  }

  const badgeClass = isThirdParty
    ? 'bg-purple-50 text-purple-700 border border-purple-200'
    : 'bg-blue-50 text-blue-700 border border-blue-200'

  const badgeLabel = isThirdParty ? 'Third-party offer' : 'Issuer buyback'

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            {ticker && (
              <span className="text-xs font-mono font-semibold bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                {ticker}
              </span>
            )}
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeClass}`}>
              {badgeLabel}
            </span>
            <span className="text-xs text-gray-400">{daysAgo(filing.fileDate)}</span>
          </div>

          <h3 className="font-medium text-gray-900 truncate">{name}</h3>

          {acquirer && (
            <p className="text-sm text-gray-500 mt-0.5">
              Acquirer: <span className="text-gray-700">{extractName(acquirer)}</span>
            </p>
          )}

          <p className="text-xs text-gray-400 mt-1">{filing.location} · {filing.form}</p>

          {stockPrice && (
            <div className="flex items-center gap-3 mt-2">
              <span className="text-lg font-semibold text-gray-900">
                ${stockPrice.price?.toFixed(2)}
              </span>
              <span className="text-xs text-gray-400">
                H: ${stockPrice.high?.toFixed(2)} · L: ${stockPrice.low?.toFixed(2)}
              </span>
              <span className="text-xs text-gray-400">
                Vol: {stockPrice.volume?.toLocaleString()}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 shrink-0">
          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="text-sm px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {analyzing ? 'Analyzing...' : 'Analyze opportunity'}
          </button>
          <a
            href="https://www.sec.gov/cgi-bin/browse-edgar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            View on EDGAR
          </a>
        </div>
      </div>

      {analysis && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              AI Analysis
            </p>
            {hasDocument !== null && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${hasDocument ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                {hasDocument ? 'Based on filing document' : 'General analysis'}
              </span>
            )}
          </div>
          <div className="text-sm text-gray-700 leading-relaxed prose prose-sm max-w-none">
            <ReactMarkdown>{analysis}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  )
}