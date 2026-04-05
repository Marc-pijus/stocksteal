'use client'

import { useState } from 'react'

const translations = {
  en: {
    topBar: 'Early access — First 100 subscribers at $9/month',
    masthead: 'StockSteal',
    mastheadSub: 'SEC Tender Offer Intelligence · Published Daily',
    nav: ['Opportunities', 'How it works', 'Pricing', 'FAQ'],
    navDashboard: 'View dashboard',
    navSubscribe: 'Subscribe $9/mo',
    heroLabel: 'Special Situations · Tender Offers · Corporate Actions',
    heroTitle: ['Every U.S. tender offer,', 'analyzed within ', '60 seconds', ' of SEC filing.'],
    heroBody: "StockSteal monitors EDGAR around the clock, reads the legal documents so you don't have to, and delivers a clear BUY / WATCH / AVOID signal with the numbers that matter — offer price, current price, premium, and expiration.",
    heroCta1: 'Read a sample analysis ↓',
    heroCta2: 'Start for $9/month',
    newsletterLabel: 'Free daily digest',
    newsletterTitle: 'Get tender offer alerts in your inbox',
    newsletterBody: 'One email per day when new opportunities are detected. Free forever. No spam.',
    newsletterPlaceholder: 'your@email.com',
    newsletterBtn: 'Get free alerts →',
    newsletterDisclaimer: 'By subscribing you agree to receive daily emails. Unsubscribe at any time. Not investment advice.',
    statsLabels: ['Offers tracked', 'Active monthly', 'Full access'],
    exampleLabel: 'Sample analysis · Free',
    exampleTitle: "Today's featured opportunity",
    filingLabel: 'Latest filing',
    issuerBuyback: 'Issuer buyback',
    lastClose: 'Last close',
    metrics: ['Offer price', 'Premium to market', 'Form type', 'Signal'],
    analysisLabel: 'Full analysis · Based on SEC filing document',
    lockedMsg: '3 more active opportunities are available to Pro subscribers.',
    lockedBtn: 'Unlock for $9/month →',
    howLabel: 'How it works',
    howSteps: [
      { title: 'EDGAR monitored continuously', body: 'Every SC TO-I and SC TO-T filing is detected within minutes of publication on the SEC database. No manual searching required on your part.' },
      { title: 'Legal documents parsed by AI', body: 'Our system reads the full offering document — sometimes 80 pages — and extracts offer price, expiration date, conditions, and total deal size automatically.' },
      { title: 'Clear signal delivered to you', body: 'You receive a BUY, WATCH, or AVOID recommendation with specific numbers, risk factors, and what to monitor next — in plain English, within 60 seconds.' },
    ],
    pricingLabel: 'Pricing',
    pricingBody: 'The featured analysis above is always free. Subscribe to unlock all active opportunities, real-time alerts, and full access to every filing.',
    planLabel: 'Pro',
    planPrice: '$9',
    planPer: '/month',
    planSub: 'Cancel anytime · No commitment',
    planTag: 'Early access',
    planFeatures: [
      'All active tender offers',
      'Full AI analysis on every filing',
      'Real-time email alerts',
      'BUY / WATCH / AVOID signals',
      'Offer price vs market price',
      'Premium calculation',
    ],
    planBtn: 'Subscribe for $9/month →',
    faqLabel: 'Frequently asked questions',
    faqs: [
      { q: 'What is a tender offer?', a: 'A tender offer is when a company — or a third party — offers to buy shares from existing shareholders at a fixed price, usually above the current market price. If you buy shares below that price and tender them, you capture the difference as a return.' },
      { q: 'How is StockSteal different from checking EDGAR myself?', a: 'EDGAR publishes raw legal documents of 40–80 pages. StockSteal reads them automatically, extracts the key numbers, fetches the current market price, calculates the premium, and delivers a plain-English recommendation — all within 60 seconds of the filing.' },
      { q: 'How often are new opportunities added?', a: 'The system checks EDGAR twice daily on trading days. When a new tender offer is detected it is analyzed and added to your dashboard automatically. Pro subscribers also receive an immediate email alert.' },
      { q: 'Is this investment advice?', a: 'No. StockSteal provides information and analysis for educational and informational purposes only. Always conduct your own research and consult a qualified financial advisor before making investment decisions.' },
    ],
    footerDisclaimer: 'Data sourced from SEC EDGAR. Not investment advice. For informational purposes only. StockSteal is not affiliated with the U.S. Securities and Exchange Commission.',
    footerLinks: ['Privacy', 'Terms'],
    analysisText: `Scholastic has filed an issuer tender offer to repurchase shares at **$45.00 per share** in cash. With the stock currently trading at $39.20, this represents a **14.8% premium** over the current market price.\n\n**Offer Terms:** Up to $150M in shares at $45.00 fixed price. Expiration in 20 business days. No financing condition — fully funded from existing cash reserves.\n\n**Opportunity:** If you purchase shares below $45.00 and tender them, you lock in a risk-adjusted return of up to 14.8% in approximately 4 weeks. The company has a strong balance sheet with $280M in cash, making completion highly likely.\n\n**Key Risks:** Proration risk if oversubscribed — you may not get all shares accepted. Share price may decline if offer fails or is withdrawn.\n\n**Recommendation: WATCH** — Monitor the offer expiration date and proration levels. If the stock dips below $42, the risk/reward becomes more attractive.`,
  },
  es: {
    topBar: 'Acceso anticipado — Primeros 100 suscriptores a $9/mes',
    masthead: 'StockSteal',
    mastheadSub: 'Inteligencia sobre Ofertas de Compra SEC · Publicado Diariamente',
    nav: ['Oportunidades', 'Cómo funciona', 'Precios', 'FAQ'],
    navDashboard: 'Ver dashboard',
    navSubscribe: 'Suscribirse $9/mes',
    heroLabel: 'Situaciones Especiales · Ofertas de Compra · Acciones Corporativas',
    heroTitle: ['Cada oferta de compra en EE.UU.,', 'analizada en menos de ', '60 segundos', ' tras el registro en la SEC.'],
    heroBody: 'StockSteal monitoriza EDGAR las 24 horas, lee los documentos legales por ti y te entrega una señal clara de COMPRAR / VIGILAR / EVITAR con los números que importan — precio de oferta, precio actual, prima y fecha de vencimiento.',
    heroCta1: 'Ver un análisis de ejemplo ↓',
    heroCta2: 'Empezar por $9/mes',
    newsletterLabel: 'Resumen diario gratuito',
    newsletterTitle: 'Recibe alertas de ofertas de compra en tu bandeja de entrada',
    newsletterBody: 'Un email al día cuando se detectan nuevas oportunidades. Gratis para siempre. Sin spam.',
    newsletterPlaceholder: 'tu@email.com',
    newsletterBtn: 'Recibir alertas gratis →',
    newsletterDisclaimer: 'Al suscribirte aceptas recibir emails diarios. Date de baja en cualquier momento. No es asesoramiento financiero.',
    statsLabels: ['Ofertas rastreadas', 'Activas al mes', 'Acceso completo'],
    exampleLabel: 'Análisis de muestra · Gratis',
    exampleTitle: 'Oportunidad destacada de hoy',
    filingLabel: 'Último registro',
    issuerBuyback: 'Recompra del emisor',
    lastClose: 'Último cierre',
    metrics: ['Precio de oferta', 'Prima sobre mercado', 'Tipo de formulario', 'Señal'],
    analysisLabel: 'Análisis completo · Basado en el documento SEC',
    lockedMsg: '3 oportunidades activas más disponibles para suscriptores Pro.',
    lockedBtn: 'Desbloquear por $9/mes →',
    howLabel: 'Cómo funciona',
    howSteps: [
      { title: 'EDGAR monitorizado continuamente', body: 'Cada registro SC TO-I y SC TO-T se detecta en minutos tras su publicación en la base de datos de la SEC. No necesitas buscar nada manualmente.' },
      { title: 'Documentos legales analizados por IA', body: 'Nuestro sistema lee el documento completo de la oferta — a veces 80 páginas — y extrae automáticamente el precio, fecha de vencimiento, condiciones y volumen total del deal.' },
      { title: 'Señal clara entregada a ti', body: 'Recibes una recomendación COMPRAR, VIGILAR o EVITAR con números concretos, factores de riesgo y qué monitorizar a continuación — en lenguaje claro, en menos de 60 segundos.' },
    ],
    pricingLabel: 'Precios',
    pricingBody: 'El análisis destacado de arriba es siempre gratuito. Suscríbete para desbloquear todas las oportunidades activas, alertas en tiempo real y acceso completo a cada registro.',
    planLabel: 'Pro',
    planPrice: '$9',
    planPer: '/mes',
    planSub: 'Cancela cuando quieras · Sin compromiso',
    planTag: 'Acceso anticipado',
    planFeatures: [
      'Todas las ofertas de compra activas',
      'Análisis completo de IA en cada registro',
      'Alertas por email en tiempo real',
      'Señales COMPRAR / VIGILAR / EVITAR',
      'Precio de oferta vs precio de mercado',
      'Cálculo de prima',
    ],
    planBtn: 'Suscribirse por $9/mes →',
    faqLabel: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Qué es una oferta de compra (tender offer)?', a: 'Una oferta de compra es cuando una empresa — o un tercero — ofrece comprar acciones a los accionistas existentes a un precio fijo, normalmente por encima del precio de mercado actual. Si compras acciones por debajo de ese precio y las tiendes, capturas la diferencia como rentabilidad.' },
      { q: '¿En qué se diferencia StockSteal de revisar EDGAR yo mismo?', a: 'EDGAR publica documentos legales crudos de 40-80 páginas. StockSteal los lee automáticamente, extrae los números clave, obtiene el precio de mercado actual, calcula la prima y entrega una recomendación en lenguaje claro, todo en menos de 60 segundos desde el registro.' },
      { q: '¿Con qué frecuencia se añaden nuevas oportunidades?', a: 'El sistema revisa EDGAR dos veces al día en días de trading. Cuando se detecta una nueva oferta de compra, se analiza y añade automáticamente al dashboard. Los suscriptores Pro también reciben una alerta por email inmediata.' },
      { q: '¿Es esto asesoramiento financiero?', a: 'No. StockSteal proporciona información y análisis únicamente con fines educativos e informativos. Realiza siempre tu propia investigación y consulta a un asesor financiero cualificado antes de tomar decisiones de inversión.' },
    ],
    footerDisclaimer: 'Datos obtenidos de SEC EDGAR. No es asesoramiento financiero. Solo con fines informativos. StockSteal no está afiliado a la Comisión de Valores y Bolsa de EE.UU.',
    footerLinks: ['Privacidad', 'Términos'],
    analysisText: `Scholastic ha presentado una oferta de recompra para readquirir acciones a **$45,00 por acción** en efectivo. Con la acción cotizando actualmente a $39,20, esto representa una **prima del 14,8%** sobre el precio de mercado actual.\n\n**Condiciones de la oferta:** Hasta $150M en acciones a precio fijo de $45,00. Vencimiento en 20 días hábiles. Sin condición de financiación — totalmente financiada con reservas de caja existentes.\n\n**Oportunidad:** Si compras acciones por debajo de $45,00 y las tiendes, aseguras una rentabilidad ajustada al riesgo de hasta el 14,8% en aproximadamente 4 semanas. La empresa tiene un balance sólido con $280M en caja, lo que hace muy probable la finalización.\n\n**Riesgos clave:** Riesgo de prorrateo si hay sobresubscripción — puede que no acepten todas tus acciones. El precio de la acción podría caer si la oferta fracasa o se retira.\n\n**Recomendación: VIGILAR** — Monitoriza la fecha de vencimiento de la oferta y los niveles de prorrateo. Si la acción cae por debajo de $42, la relación riesgo/recompensa se vuelve más atractiva.`,
  }
}

const sampleFiling = {
  ticker: 'SCHL',
  company: 'Scholastic Corporation',
  form: 'SC TO-I',
  fileDate: 'March 28, 2026',
  marketPrice: 39.20,
  offerPrice: 45.00,
  premium: 14.8,
  recommendation: 'WATCH',
}

export default function LandingPage() {
  const [lang, setLang] = useState<'en' | 'es'>('en')
  const t = translations[lang]

  return (
    <div style={{ fontFamily: '"Georgia", "Times New Roman", serif', background: '#faf8f3', color: '#1a1a16', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Source+Sans+3:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .serif { font-family: 'Playfair Display', Georgia, serif; }
        .sans { font-family: 'Source Sans 3', system-ui, sans-serif; }
        .muted { color: #6b6b5a; }
        a { color: inherit; }
        .divider { border: none; border-top: 1px solid #e0ddd4; }
        .thin-divider { border: none; border-top: 1px solid #ede9e0; }
        .card { background: #fff; border: 1px solid #e0ddd4; }
        .btn-primary { background: #1a1a16; color: #faf8f3; border: none; padding: 12px 28px; font-family: 'Source Sans 3', sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; letter-spacing: 0.04em; text-decoration: none; display: inline-block; transition: background 0.15s; }
        .btn-primary:hover { background: #333330; }
        .btn-outline { background: transparent; color: #1a1a16; border: 1px solid #1a1a16; padding: 11px 24px; font-family: 'Source Sans 3', sans-serif; font-size: 14px; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.15s; letter-spacing: 0.02em; }
        .btn-outline:hover { background: #1a1a16; color: #faf8f3; }
        .tag { display: inline-block; font-family: 'Source Sans 3', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; padding: 3px 8px; border: 1px solid; }
        .tag-buy { color: #1a6b35; border-color: #1a6b35; background: #f0f8f3; }
        .tag-watch { color: #8b5e00; border-color: #8b5e00; background: #fdf8f0; }
        .tag-avoid { color: #c0392b; border-color: #c0392b; background: #fdf3f2; }
        .tag-neutral { color: #6b6b5a; border-color: #c8c4b8; background: #f8f6f0; }
        .ticker { font-family: 'Source Sans 3', monospace; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; color: #c0392b; }
        .section-label { font-family: 'Source Sans 3', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: #6b6b5a; }
        .blur-row { filter: blur(4px); user-select: none; pointer-events: none; }
        input[type="email"] { border: 1px solid #c8c4b8; background: #fff; padding: 11px 16px; font-family: 'Source Sans 3', sans-serif; font-size: 14px; color: #1a1a16; outline: none; width: 100%; }
        input[type="email"]:focus { border-color: #1a1a16; }
        input[type="email"]::placeholder { color: #a8a89a; }
        .prose p { margin-bottom: 14px; line-height: 1.8; color: #3a3a32; font-family: 'Source Sans 3', sans-serif; font-size: 15px; }
        .prose strong { color: #1a1a16; font-weight: 600; }
        .lang-btn { background: transparent; border: 1px solid #c8c4b8; padding: 4px 10px; font-family: 'Source Sans 3', sans-serif; font-size: 12px; font-weight: 500; cursor: pointer; letter-spacing: 0.06em; transition: all 0.15s; }
        .lang-btn.active { background: #1a1a16; color: #faf8f3; border-color: #1a1a16; }
        .lang-btn:not(.active):hover { border-color: #1a1a16; }
      `}</style>

      {/* TOP BAR */}
      <div style={{ background: '#1a1a16', color: '#faf8f3', padding: '8px 40px', textAlign: 'center' }}>
        <span className="sans" style={{ fontSize: 12, letterSpacing: '0.04em' }}>{t.topBar}</span>
      </div>

      {/* MASTHEAD */}
      <header style={{ borderBottom: '3px solid #1a1a16', padding: '0 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ padding: '20px 0 16px', textAlign: 'center', borderBottom: '1px solid #e0ddd4', marginBottom: 14, position: 'relative' }}>
            <h1 className="serif" style={{ fontSize: 48, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1 }}>{t.masthead}</h1>
            <p className="sans" style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6b6b5a', marginTop: 6 }}>{t.mastheadSub}</p>
            <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: 4 }}>
              <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
              <button className={`lang-btn ${lang === 'es' ? 'active' : ''}`} onClick={() => setLang('es')}>ES</button>
            </div>
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 14 }}>
            <div style={{ display: 'flex', gap: 28 }}>
              {t.nav.map((item, i) => (
                <a key={i} href={`#${['opportunities','how-it-works','pricing','faq'][i]}`} className="sans" style={{ fontSize: 13, letterSpacing: '0.04em', textDecoration: 'none', color: '#3a3a32' }}>{item}</a>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <a href="/dashboard" className="btn-outline" style={{ padding: '7px 16px', fontSize: 12 }}>{t.navDashboard}</a>
              <a href="#pricing" className="btn-primary" style={{ padding: '7px 16px', fontSize: 12 }}>{t.navSubscribe}</a>
            </div>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section style={{ padding: '60px 40px 48px', borderBottom: '1px solid #e0ddd4' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 60, alignItems: 'start' }}>
          <div>
            <div className="sans" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#c0392b', marginBottom: 20, fontWeight: 600 }}>{t.heroLabel}</div>
            <h2 className="serif" style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 24 }}>
              {t.heroTitle[0]}<br />
              {t.heroTitle[1]}<em>{t.heroTitle[2]}</em>{t.heroTitle[3]}
            </h2>
            <p className="sans" style={{ fontSize: 16, lineHeight: 1.75, color: '#4a4a3e', maxWidth: 540, marginBottom: 32 }}>{t.heroBody}</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a href="#example" className="btn-primary">{t.heroCta1}</a>
              <a href="#pricing" className="btn-outline">{t.heroCta2}</a>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div style={{ background: '#fff', border: '1px solid #e0ddd4', padding: '28px 28px 24px' }}>
            <div className="section-label" style={{ marginBottom: 16 }}>{t.newsletterLabel}</div>
            <h3 className="serif" style={{ fontSize: 22, fontWeight: 600, marginBottom: 10, lineHeight: 1.3 }}>{t.newsletterTitle}</h3>
            <p className="sans" style={{ fontSize: 13, color: '#6b6b5a', lineHeight: 1.6, marginBottom: 20 }}>{t.newsletterBody}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input type="email" placeholder={t.newsletterPlaceholder} />
              <button className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>{t.newsletterBtn}</button>
            </div>
            <p className="sans" style={{ fontSize: 11, color: '#a8a89a', marginTop: 12, lineHeight: 1.5 }}>{t.newsletterDisclaimer}</p>
            <hr className="thin-divider" style={{ margin: '20px 0 16px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {[['500+', t.statsLabels[0]], ['~15', t.statsLabels[1]], ['$9', t.statsLabels[2]]].map(([v, l]) => (
                <div key={l} style={{ textAlign: 'center' }}>
                  <div className="serif" style={{ fontSize: 22, fontWeight: 600 }}>{v}</div>
                  <div className="sans" style={{ fontSize: 11, color: '#6b6b5a', letterSpacing: '0.04em' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LIVE EXAMPLE */}
      <section id="example" style={{ padding: '56px 40px', borderBottom: '1px solid #e0ddd4' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div className="section-label" style={{ marginBottom: 10 }}>{t.exampleLabel}</div>
              <h2 className="serif" style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.01em' }}>{t.exampleTitle}</h2>
            </div>
            <span className="tag tag-watch">{t.filingLabel}</span>
          </div>

          <div className="card" style={{ padding: '32px 36px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <span className="ticker">{sampleFiling.ticker}</span>
                  <span className="tag tag-neutral">{t.issuerBuyback}</span>
                  <span className="sans muted" style={{ fontSize: 12 }}>{sampleFiling.fileDate}</span>
                </div>
                <h3 className="serif" style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.01em' }}>{sampleFiling.company}</h3>
                <p className="sans muted" style={{ fontSize: 13, marginTop: 3 }}>{sampleFiling.form} · NASDAQ Global Select Market</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="serif" style={{ fontSize: 32, fontWeight: 600 }}>${sampleFiling.marketPrice}</div>
                <div className="sans" style={{ fontSize: 12, color: '#6b6b5a', marginTop: 2 }}>{t.lastClose}</div>
              </div>
            </div>

            <hr className="divider" style={{ marginBottom: 24 }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, marginBottom: 28, border: '1px solid #e0ddd4' }}>
              {[
                { label: t.metrics[0], value: `$${sampleFiling.offerPrice}` },
                { label: t.metrics[1], value: `+${sampleFiling.premium}%` },
                { label: t.metrics[2], value: sampleFiling.form },
                { label: t.metrics[3], value: sampleFiling.recommendation },
              ].map((m, i) => (
                <div key={i} style={{ padding: '16px 20px', borderRight: i < 3 ? '1px solid #e0ddd4' : 'none', background: i === 1 ? '#f8f6f0' : 'transparent' }}>
                  <div className="sans" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6b5a', marginBottom: 6 }}>{m.label}</div>
                  <div className="serif" style={{ fontSize: 22, fontWeight: 600, color: i === 1 ? '#1a6b35' : '#1a1a16' }}>{m.value}</div>
                </div>
              ))}
            </div>

            <div>
              <div className="section-label" style={{ marginBottom: 14 }}>{t.analysisLabel}</div>
              <div className="sans prose">
                {t.analysisText.split('\n\n').map((para, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 4 }}>
            <div style={{ background: '#fff3f2', border: '1px solid #f0d8d6', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
              <p className="sans" style={{ fontSize: 13, color: '#8b2020' }}><strong>{t.lockedMsg}</strong></p>
              <a href="#pricing" className="btn-primary" style={{ background: '#c0392b', fontSize: 13, padding: '9px 20px' }}>{t.lockedBtn}</a>
            </div>
            {[
              { ticker: 'DAWN', company: 'Day One Biopharmaceuticals', premium: '+18.2%', rec: 'BUY' },
              { ticker: 'RBNE', company: 'Robin Energy Ltd.', premium: '+9.4%', rec: 'WATCH' },
              { ticker: 'MRSN', company: 'Mersana Therapeutics', premium: '-14.0%', rec: 'AVOID' },
            ].map((f, i) => (
              <div key={i} className="blur-row" style={{ background: '#fff', border: '1px solid #e0ddd4', borderTop: 'none', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span className="ticker">{f.ticker}</span>
                  <span className="sans" style={{ fontSize: 15 }}>{f.company}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <span className="serif" style={{ fontSize: 18, color: f.premium.startsWith('+') ? '#1a6b35' : '#c0392b' }}>{f.premium}</span>
                  <span className={`tag ${f.rec === 'BUY' ? 'tag-buy' : f.rec === 'WATCH' ? 'tag-watch' : 'tag-avoid'}`}>{f.rec}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: '56px 40px', borderBottom: '1px solid #e0ddd4', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="section-label" style={{ marginBottom: 40 }}>{t.howLabel}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid #e0ddd4' }}>
            {(['I','II','III'] as const).map((n, i) => (
              <div key={i} style={{ padding: '32px 28px', borderRight: i < 2 ? '1px solid #e0ddd4' : 'none' }}>
                <div className="serif" style={{ fontSize: 40, color: '#e0ddd4', fontWeight: 700, lineHeight: 1, marginBottom: 20 }}>{n}</div>
                <h3 className="sans" style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#1a1a16', marginBottom: 10 }}>{t.howSteps[i].title}</h3>
                <p className="sans" style={{ fontSize: 14, color: '#6b6b5a', lineHeight: 1.7 }}>{t.howSteps[i].body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: '56px 40px', borderBottom: '1px solid #e0ddd4' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="section-label" style={{ marginBottom: 16 }}>{t.pricingLabel}</div>
          <p className="sans" style={{ fontSize: 14, color: '#6b6b5a', marginBottom: 40, maxWidth: 520 }}>{t.pricingBody}</p>
          <div style={{ maxWidth: 360 }}>
            <div style={{ background: '#1a1a16', color: '#faf8f3', padding: '32px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, right: 24, background: '#c0392b', color: '#fff', fontSize: 10, fontFamily: 'Source Sans 3, sans-serif', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 12px' }}>{t.planTag}</div>
              <div className="section-label" style={{ marginBottom: 16, color: '#a8a89a' }}>{t.planLabel}</div>
              <div className="serif" style={{ fontSize: 40, fontWeight: 600, marginBottom: 4, color: '#faf8f3' }}>{t.planPrice}<span className="sans" style={{ fontSize: 15, fontWeight: 300, color: '#6b6b5a' }}>{t.planPer}</span></div>
              <div className="sans" style={{ fontSize: 13, color: '#6b6b5a', marginBottom: 28 }}>{t.planSub}</div>
              <ul className="sans" style={{ listStyle: 'none', fontSize: 14, color: '#c8c4b8', lineHeight: 1.6 }}>
                {t.planFeatures.map((f, i) => (
                  <li key={i} style={{ padding: '9px 0', borderBottom: '1px solid #2a2a26', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: '#c0392b', marginTop: 2 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href="/subscribe" className="btn-primary" style={{ marginTop: 28, display: 'block', textAlign: 'center', background: '#fff', color: '#1a1a16' }}>{t.planBtn}</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: '56px 40px', borderBottom: '1px solid #e0ddd4', background: '#fff' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div className="section-label" style={{ marginBottom: 40 }}>{t.faqLabel}</div>
          {t.faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: '1px solid #e0ddd4', padding: '22px 0' }}>
              <h3 className="serif" style={{ fontSize: 17, fontWeight: 600, marginBottom: 10 }}>{faq.q}</h3>
              <p className="sans" style={{ fontSize: 14, color: '#4a4a3e', lineHeight: 1.75 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '3px solid #1a1a16', padding: '28px 40px', background: '#faf8f3' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <span className="serif" style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>{t.masthead}</span>
          <p className="sans" style={{ fontSize: 12, color: '#6b6b5a', maxWidth: 480, textAlign: 'center' }}>{t.footerDisclaimer}</p>
          <div style={{ display: 'flex', gap: 20 }}>
            {t.footerLinks.map((l, i) => (
              <a key={i} href="#" className="sans muted" style={{ fontSize: 12, textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}