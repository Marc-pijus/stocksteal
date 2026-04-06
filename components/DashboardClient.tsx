'use client'

import { useState } from 'react'
import { TenderOfferCard } from '@/components/TenderOfferCard'

const t = {
  en: {
    subtitle: 'Real-time tender offer opportunities',
    activeFilings: 'active filings',
    subscribe: 'Subscribe $9/month →',
    signOut: 'Sign out',
    sectionTitle: 'Latest Tender Offers — SEC EDGAR',
    unlockTitle: 'Unlock all opportunities',
    unlockBody: 'Subscribe to StockSteal Pro for $9/month to access all active tender offer analyses.',
    success: 'Subscription activated successfully. Welcome to StockSteal Pro!',
  },
  es: {
    subtitle: 'Oportunidades de ofertas de compra en tiempo real',
    activeFilings: 'ofertas activas',
    subscribe: 'Suscribirse $9/mes →',
    signOut: 'Cerrar sesión',
    sectionTitle: 'Últimas Ofertas de Compra — SEC EDGAR',
    unlockTitle: 'Desbloquear todas las oportunidades',
    unlockBody: 'Suscríbete a StockSteal Pro por $9/mes para acceder a todos los análisis de ofertas activas.',
    success: 'Suscripción activada correctamente. ¡Bienvenido a StockSteal Pro!',
  }
}

export function DashboardClient({
  filings,
  isSubscribed,
  showSuccess,
}: {
  filings: any[]
  isSubscribed: boolean
  showSuccess: boolean
}) {
  const [lang, setLang] = useState<'en' | 'es'>('en')
  const txt = t[lang]

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
            <p className="text-xs text-gray-500">{txt.subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Language selector */}
            <div style={{ display: 'flex', gap: 4 }}>
              <button
                onClick={() => setLang('en')}
                style={{
                  background: lang === 'en' ? '#1a1a1a' : 'transparent',
                  color: lang === 'en' ? '#fff' : '#6b7280',
                  border: '1px solid #d1d5db',
                  padding: '3px 8px',
                  fontSize: 11,
                  fontWeight: 500,
                  cursor: 'pointer',
                  letterSpacing: '0.06em',
                  borderRadius: 3,
                }}
              >EN</button>
              <button
                onClick={() => setLang('es')}
                style={{
                  background: lang === 'es' ? '#1a1a1a' : 'transparent',
                  color: lang === 'es' ? '#fff' : '#6b7280',
                  border: '1px solid #d1d5db',
                  padding: '3px 8px',
                  fontSize: 11,
                  fontWeight: 500,
                  cursor: 'pointer',
                  letterSpacing: '0.06em',
                  borderRadius: 3,
                }}
              >ES</button>
            </div>

            {!isSubscribed && (
              <form action="/api/stripe/checkout" method="POST">
                <button type="submit" className="text-sm px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors">
                  {txt.subscribe}
                </button>
              </form>
            )}
            <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full">
              {filings.length} {txt.activeFilings}
            </span>
            <form action="/api/auth/logout" method="POST">
              <button type="submit" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                {txt.signOut}
              </button>
            </form>
          </div>
        </div>
      </header>

      {showSuccess && (
        <div className="max-w-6xl mx-auto px-6 pt-4">
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm text-green-700">
            {txt.success}
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            {txt.sectionTitle}
          </h2>
        </div>
        <div className="grid gap-4">
          {visibleFilings.map((filing: any) => (
            <TenderOfferCard key={filing.id} filing={filing} lang={lang} />
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
                  <h3 className="font-semibold text-gray-900 mb-2">{txt.unlockTitle}</h3>
                  <p className="text-sm text-gray-500 mb-4">{txt.unlockBody}</p>
                  <form action="/api/stripe/checkout" method="POST">
                    <button type="submit" className="text-sm px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors">
                      {txt.subscribe}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}