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
  event_type?: string
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

function getSignal(text: string): { label: string; color: string } | null {
  const upper = text.toUpperCase()
  if (upper.includes('RECOMMENDATION: BUY') || upper.includes('SIGNAL: BUY') || upper.includes('COMPRAR')) {
    return { label: 'BUY', color: '#16a34a' }
  }
  if (upper.includes('RECOMMENDATION: AVOID') || upper.includes('EVITAR')) {
    return { label: 'AVOID', color: '#dc2626' }
  }
  if (upper.includes('RECOMMENDATION: WATCH') || upper.includes('SIGNAL: WATCH') || upper.includes('VIGILAR')) {
    return { label: 'WATCH', color: '#d97706' }
  }
  return null
}

const labels = {
  en: {
    issuerBuyback: 'Issuer buyback',
    thirdParty: 'Third-party offer',
    buyback: 'Buyback program',
    goingPrivate: 'Going private',
    acquirer: 'Acquirer',
    aiAnalysis: 'AI Analysis',
    basedOnDoc: 'Based on filing document',
    generalAnalysis: 'General analysis',
    viewOnEdgar: 'View on EDGAR',
    pending: 'Analysis will be available shortly.',
    showAnalysis: 'Show analysis ↓',
    hideAnalysis: 'Hide analysis ↑',
  },
  es: {
    issuerBuyback: 'Recompra del emisor',
    thirdParty: 'Oferta de terceros',
    buyback: 'Programa de recompra',
    goingPrivate: 'Privatización',
    acquirer: 'Adquirente',
    aiAnalysis: 'Análisis IA',
    basedOnDoc: 'Basado en el documento SEC',
    generalAnalysis: 'Análisis general',
    viewOnEdgar: 'Ver en EDGAR',
    pending: 'El análisis estará disponible en breve.',
    showAnalysis: 'Ver análisis ↓',
    hideAnalysis: 'Ocultar análisis ↑',
  }
}

function getBadgeLabel(form: string, eventType: string | undefined, lbl: typeof labels['en']): string {
  if (eventType === 'buyback') return lbl.buyback
  if (eventType === 'going_private') return lbl.goingPrivate
  if (form === 'SC TO-T') return lbl.thirdParty
  return lbl.issuerBuyback
}

function getBadgeClass(form: string, eventType: string | undefined): string {
  if (eventType === 'buyback') return 'bg-green-50 text-green-700 border border-green-200'
  if (eventType === 'going_private') return 'bg-red-50 text-red-700 border border-red-200'
  if (form === 'SC TO-T') return 'bg-purple-50 text-purple-700 border border-purple-200'
  return 'bg-blue-50 text-blue-700 border border-blue-200'
}

export function TenderOfferCard({ filing, lang = 'en' }: { filing: Filing, lang?: 'en' | 'es' }) {
  const [expanded, setExpanded] = useState(false)

  const mainCompany = filing.companies[0]
  const acquirer = filing.companies[1]
  const ticker = extractTicker(mainCompany)
  const name = extractName(mainCompany)
  const lbl = labels[lang]

  const displayAnalysis = lang === 'es'
    ? (filing.analysis?.analysis_es || filing.analysis?.analysis || null)
    : (filing.analysis?.analysis || null)

  const displayHasDocument = filing.analysis?.has_document ?? null
  const displayMarketPrice = filing.analysis?.market_price || null
  const signal = displayAnalysis ? getSignal(displayAnalysis) : null

  const badgeClass = getBadgeClass(filing.form, filing.event_type)
  const badgeLabel = getBadgeLabel(filing.form, filing.event_type, lbl)

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors">
      {/* Card header — always visible */}
      <div className="p-5">
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
          </div>

          {/* Right side: price + signal */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            {displayMarketPrice && (
              <span className="text-lg font-semibold text-gray-900">
                ${Number(displayMarketPrice).toFixed(2)}
              </span>
            )}
            {signal && (
              <span style={{
                background: signal.color + '15',
                color: signal.color,
                border: `1px solid ${signal.color}40`,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.08em',
                padding: '3px 10px',
                borderRadius: 4,
              }}>
                {signal.label}
              </span>
            )}
          </div>
        </div>

        {/* Toggle + EDGAR link */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          {displayAnalysis ? (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors"
            >
              {expanded ? lbl.hideAnalysis : lbl.showAnalysis}
            </button>
          ) : (
            <span className="text-xs text-gray-400">{lbl.pending}</span>
          )}
          <a
            href="https://www.sec.gov/cgi-bin/browse-edgar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            {lbl.viewOnEdgar}
          </a>
        </div>
      </div>

      {/* Expandable analysis */}
      {expanded && displayAnalysis && (
        <div className="px-5 pb-5 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center gap-2 pt-4 mb-3">
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
      )}
    </div>
  )
}