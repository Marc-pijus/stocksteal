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
  analysis?: {
    analysis: string
    analysis_es?: string
    has_document: boolean
    ticker: string | null
    market_price: number | null
    updated_at: string
  } | null
}

function extractTicker(company: string): string | null {
  const match = company.match(/\(([A-Z]{2,5})\)/)
  return match ? match[1] : null
}

function extractName(company: string): string {
  return company.replace(/\s*\(.*?\)\s*/g, '').trim()
}

function daysAgo(dateStr: string, lang: 'en' | 'es'): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  if (lang === 'es') {
    if (diff === 0) return 'Hoy'
    if (diff === 1) return 'Ayer'
    return `hace ${diff} días`
  }
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Yesterday'
  return `${diff} days ago`
}

const labels = {
  en: {
    issuerBuyback: 'Issuer buyback',
    thirdParty: 'Third-party offer',
    acquirer: 'Acquirer',
    aiAnalysis: 'AI Analysis',
    basedOnDoc: 'Based on filing document',
    generalAnalysis: 'General analysis',
    viewOnEdgar: 'View on EDGAR',
    pending: 'Analysis will be available shortly.',
  },
  es: {
    issuerBuyback: 'Recompra del emisor',
    thirdParty: 'Oferta de terceros',
    acquirer: 'Adquirente',
    aiAnalysis: 'Análisis IA',
    basedOnDoc: 'Basado en el documento SEC',
    generalAnalysis: 'Análisis general',
    viewOnEdgar: 'Ver en EDGAR',
    pending: 'El análisis estará disponible en breve.',
  }
}

export function TenderOfferCard({ filing, lang = 'en' }: { filing: Filing, lang?: 'en' | 'es' }) {
  const mainCompany = filing.companies[0]
  const acquirer = filing.companies[1]
  const ticker = extractTicker(mainCompany)
  const name = extractName(mainCompany)
  const isThirdParty = filing.form === 'SC TO-T'
  const lbl = labels[lang]

  const displayAnalysis = lang === 'es'
    ? (filing.analysis?.analysis_es || filing.analysis?.analysis || null)
    : (filing.analysis?.analysis || null)

  const displayHasDocument = filing.analysis?.has_document ?? null
  const displayMarketPrice = filing.analysis?.market_price || null

  const badgeClass = isThirdParty
    ? 'bg-purple-50 text-purple-700 border border-purple-200'
    : 'bg-blue-50 text-blue-700 border border-blue-200'

  const badgeLabel = isThirdParty ? lbl.thirdParty : lbl.issuerBuyback

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
            <span className="text-xs text-gray-400">{daysAgo(filing.fileDate, lang)}</span>
          </div>

          <h3 className="font-medium text-gray-900 truncate">{name}</h3>

          {acquirer && (
            <p className="text-sm text-gray-500 mt-0.5">
              {lbl.acquirer}: <span className="text-gray-700">{extractName(acquirer)}</span>
            </p>
          )}

          <p className="text-xs text-gray-400 mt-1">{filing.location} · {filing.form}</p>

          {displayMarketPrice && (
            <div className="flex items-center gap-3 mt-2">
              <span className="text-lg font-semibold text-gray-900">
                ${Number(displayMarketPrice).toFixed(2)}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 shrink-0">
          <a
            href="https://www.sec.gov/cgi-bin/browse-edgar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            {lbl.viewOnEdgar}
          </a>
        </div>
      </div>

      {displayAnalysis ? (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {lbl.aiAnalysis}
            </p>
            {displayHasDocument !== null && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${displayHasDocument ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                {displayHasDocument ? lbl.basedOnDoc : lbl.generalAnalysis}
              </span>
            )}
          </div>
          <div className="text-sm text-gray-700 leading-relaxed prose prose-sm max-w-none">
            <ReactMarkdown>{displayAnalysis}</ReactMarkdown>
          </div>
        </div>
      ) : (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">{lbl.pending}</p>
        </div>
      )}
    </div>
  )
}