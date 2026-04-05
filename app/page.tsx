import Link from 'next/link'

const sampleAnalysis = {
  ticker: 'SCHL',
  company: 'Scholastic Corporation',
  form: 'SC TO-I',
  fileDate: '2026-03-28',
  marketPrice: 39.20,
  offerPrice: 45.00,
  premium: 14.8,
  recommendation: 'WATCH',
  analysis: `Scholastic has filed an issuer tender offer to repurchase shares at $45.00 per share in cash. With the stock currently trading at $39.20, this represents a **14.8% premium** over the current market price.

**Offer Terms:** Up to $150M in shares at $45.00 fixed price. Expiration in 20 business days. No financing condition — fully funded from existing cash reserves.

**Opportunity:** If you purchase shares below $45.00 and tender them, you lock in a risk-adjusted return of up to 14.8% in approximately 4 weeks. The company has strong balance sheet with $280M in cash, making completion highly likely.

**Key Risks:** Proration risk if oversubscribed — you may not get all shares accepted. Share price may decline if offer fails or is withdrawn.

**Recommendation: WATCH** — Monitor the offer expiration date and proration levels. If the stock dips below $42, the risk/reward becomes more attractive.`
}

export default function LandingPage() {
  return (
    <div style={{
      fontFamily: '"Georgia", "Times New Roman", serif',
      background: '#0a0a0a',
      color: '#e8e4d9',
      minHeight: '100vh',
      overflowX: 'hidden'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .serif { font-family: 'Playfair Display', Georgia, serif; }
        .sans { font-family: 'DM Sans', system-ui, sans-serif; }
        .accent { color: #b8f54a; }
        .accent-dim { color: #8ab835; }
        .muted { color: #6b6b5e; }
        .card {
          background: #111110;
          border: 1px solid #222220;
          border-radius: 4px;
        }
        .btn-primary {
          background: #b8f54a;
          color: #0a0a0a;
          border: none;
          padding: 14px 32px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          border-radius: 3px;
          cursor: pointer;
          letter-spacing: 0.02em;
          text-decoration: none;
          display: inline-block;
          transition: background 0.15s;
        }
        .btn-primary:hover { background: #ceff5e; }
        .btn-outline {
          background: transparent;
          color: #e8e4d9;
          border: 1px solid #333330;
          padding: 13px 28px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          border-radius: 3px;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: border-color 0.15s;
        }
        .btn-outline:hover { border-color: #666660; }
        .tag {
          display: inline-block;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 2px;
        }
        .tag-green { background: #1a2e0a; color: #b8f54a; border: 1px solid #2a4a12; }
        .tag-yellow { background: #2a2510; color: #e8c84a; border: 1px solid #3a3518; }
        .tag-red { background: #2a1010; color: #e85a4a; border: 1px solid #3a1818; }
        .divider { border: none; border-top: 1px solid #1a1a18; margin: 0; }
        .blur-overlay {
          position: relative;
          overflow: hidden;
        }
        .blur-overlay::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 200px;
          background: linear-gradient(to bottom, transparent, #0a0a0a);
          pointer-events: none;
        }
        .metric {
          font-family: 'DM Sans', sans-serif;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s ease forwards; }
        .fade-up-2 { animation: fadeUp 0.6s 0.15s ease forwards; opacity: 0; }
        .fade-up-3 { animation: fadeUp 0.6s 0.3s ease forwards; opacity: 0; }
        .ticker-badge {
          font-family: 'DM Sans', monospace;
          font-size: 11px;
          font-weight: 500;
          background: #1a1a18;
          border: 1px solid #2a2a28;
          padding: 3px 8px;
          border-radius: 2px;
          letter-spacing: 0.05em;
        }
        .step-num {
          font-family: 'Playfair Display', serif;
          font-size: 48px;
          color: #1e1e1c;
          font-weight: 700;
          line-height: 1;
          position: absolute;
          top: -8px;
          left: 0;
        }
        .lock-card {
          background: #0e0e0c;
          border: 1px solid #1e1e1c;
          border-radius: 4px;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .prose p { margin-bottom: 12px; line-height: 1.75; }
        .prose strong { color: #e8e4d9; font-weight: 500; }
      `}</style>

      {/* NAV */}
      <nav style={{ borderBottom: '1px solid #1a1a18', padding: '0 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span className="serif" style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em' }}>StockSteal</span>
            <span className="sans muted" style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Beta</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <a href="#how" className="sans muted" style={{ fontSize: 13, textDecoration: 'none', letterSpacing: '0.03em' }}>How it works</a>
            <a href="#pricing" className="sans muted" style={{ fontSize: 13, textDecoration: 'none', letterSpacing: '0.03em' }}>Pricing</a>
            <a href="/dashboard" className="btn-outline" style={{ padding: '8px 18px', fontSize: 13 }}>Dashboard</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: '100px 40px 80px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ maxWidth: 720 }}>
          <div className="fade-up sans" style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#b8f54a', marginBottom: 24, fontWeight: 500 }}>
            SEC EDGAR · Real-time · AI-powered
          </div>
          <h1 className="serif fade-up-2" style={{ fontSize: 'clamp(42px, 6vw, 72px)', lineHeight: 1.08, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 28 }}>
            Find tender offer<br />
            opportunities <span style={{ fontStyle: 'italic', color: '#b8f54a' }}>before</span><br />
            the market does.
          </h1>
          <p className="sans fade-up-3" style={{ fontSize: 16, lineHeight: 1.7, color: '#9a9a8e', maxWidth: 520, marginBottom: 40 }}>
            StockSteal monitors every SEC tender offer filing in real time, extracts the key numbers from the legal documents, and tells you whether there's a buying opportunity — in plain English.
          </p>
          <div className="fade-up-3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#example" className="btn-primary">See a live analysis ↓</a>
            <a href="#pricing" className="btn-outline">Start for $9/month</a>
          </div>
        </div>

        {/* STATS ROW */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, marginTop: 80, background: '#1a1a18', borderRadius: 4, overflow: 'hidden' }}>
          {[
            { value: '< 60s', label: 'From SEC filing to analysis' },
            { value: '500+', label: 'Tender offers tracked per year' },
            { value: '$9', label: 'Per month, cancel anytime' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#0a0a0a', padding: '28px 32px' }}>
              <div className="serif" style={{ fontSize: 36, fontWeight: 600, color: '#e8e4d9', letterSpacing: '-0.02em' }}>{s.value}</div>
              <div className="sans muted" style={{ fontSize: 13, marginTop: 6, lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ padding: '80px 40px', borderTop: '1px solid #1a1a18' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="sans" style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b5e', marginBottom: 48 }}>How it works</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }}>
            {[
              {
                n: '01',
                title: 'EDGAR is monitored 24/7',
                body: 'Every SC TO-I and SC TO-T filing is detected within minutes of publication. No manual searching required.'
              },
              {
                n: '02',
                title: 'Documents are parsed automatically',
                body: 'Our AI reads the full legal document and extracts the offer price, expiration date, premium, and conditions.'
              },
              {
                n: '03',
                title: 'You get a clear recommendation',
                body: 'BUY, WATCH, or AVOID — with specific numbers, risk factors, and next steps. No jargon, no guesswork.'
              }
            ].map((s, i) => (
              <div key={i} style={{ position: 'relative', paddingTop: 40 }}>
                <span className="step-num">{s.n}</span>
                <h3 className="sans" style={{ fontSize: 13, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#b8f54a', marginBottom: 12 }}>{s.title}</h3>
                <p className="sans" style={{ fontSize: 15, lineHeight: 1.7, color: '#9a9a8e' }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE EXAMPLE */}
      <section id="example" style={{ padding: '80px 40px', borderTop: '1px solid #1a1a18' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div className="sans" style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b5e', marginBottom: 12 }}>Live example — free</div>
              <h2 className="serif" style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em' }}>A real tender offer, fully analyzed</h2>
            </div>
            <span className="tag tag-green">Latest filing</span>
          </div>

          {/* ANALYSIS CARD */}
          <div className="card" style={{ padding: '32px 36px' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span className="ticker-badge">{sampleAnalysis.ticker}</span>
                  <span className="tag tag-yellow">Issuer buyback</span>
                  <span className="sans muted" style={{ fontSize: 12 }}>8 days ago</span>
                </div>
                <h3 className="serif" style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.01em' }}>{sampleAnalysis.company}</h3>
                <p className="sans muted" style={{ fontSize: 13, marginTop: 4 }}>{sampleAnalysis.form} · NASDAQ</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="sans" style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em' }}>${sampleAnalysis.marketPrice}</div>
                <div className="sans" style={{ fontSize: 12, color: '#b8f54a', marginTop: 2 }}>Market price</div>
              </div>
            </div>

            <hr className="divider" style={{ marginBottom: 28 }} />

            {/* METRICS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 28 }}>
              {[
                { label: 'Offer price', value: `$${sampleAnalysis.offerPrice}`, highlight: true },
                { label: 'Premium', value: `+${sampleAnalysis.premium}%`, highlight: true },
                { label: 'Form type', value: sampleAnalysis.form, highlight: false },
                { label: 'Recommendation', value: sampleAnalysis.recommendation, highlight: false },
              ].map((m, i) => (
                <div key={i} style={{ background: '#0e0e0c', border: '1px solid #1e1e1c', borderRadius: 3, padding: '14px 16px' }}>
                  <div className="sans muted" style={{ fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>{m.label}</div>
                  <div className="sans" style={{ fontSize: 18, fontWeight: 500, color: m.highlight ? '#b8f54a' : '#e8e4d9' }}>{m.value}</div>
                </div>
              ))}
            </div>

            <hr className="divider" style={{ marginBottom: 28 }} />

            {/* ANALYSIS TEXT */}
            <div>
              <div className="sans" style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b6b5e', marginBottom: 16 }}>AI Analysis · Based on filing document</div>
              <div className="sans prose" style={{ fontSize: 14, color: '#9a9a8e', lineHeight: 1.75 }}>
                {sampleAnalysis.analysis.split('\n\n').map((para, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                ))}
              </div>
            </div>
          </div>

          {/* LOCKED CARDS */}
          <div style={{ marginTop: 16 }}>
            <div className="sans" style={{ fontSize: 12, color: '#6b6b5e', marginBottom: 12, letterSpacing: '0.04em' }}>
              + 3 more active opportunities
            </div>
            {[
              { ticker: 'DAWN', company: 'Day One Biopharmaceuticals', premium: '+18.2%', rec: 'BUY' },
              { ticker: 'RBNE', company: 'Robin Energy Ltd.', premium: '+9.4%', rec: 'WATCH' },
              { ticker: 'MRSN', company: 'Mersana Therapeutics', premium: '-14.0%', rec: 'AVOID' },
            ].map((f, i) => (
              <div key={i} className="lock-card" style={{ marginBottom: 8, filter: 'blur(3px)', userSelect: 'none', pointerEvents: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className="ticker-badge">{f.ticker}</span>
                  <span className="sans" style={{ fontSize: 14, color: '#9a9a8e' }}>{f.company}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span className="sans" style={{ fontSize: 14, color: '#b8f54a' }}>{f.premium}</span>
                  <span className={`tag ${f.rec === 'BUY' ? 'tag-green' : f.rec === 'WATCH' ? 'tag-yellow' : 'tag-red'}`}>{f.rec}</span>
                </div>
              </div>
            ))}
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <a href="#pricing" className="btn-primary">Unlock all opportunities →</a>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: '80px 40px', borderTop: '1px solid #1a1a18' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="sans" style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b5e', marginBottom: 48 }}>Pricing</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 720 }}>

            {/* FREE */}
            <div className="card" style={{ padding: '32px' }}>
              <div className="sans muted" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>Free</div>
              <div className="serif" style={{ fontSize: 40, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 4 }}>$0</div>
              <div className="sans muted" style={{ fontSize: 13, marginBottom: 28 }}>No credit card required</div>
              <ul className="sans" style={{ listStyle: 'none', fontSize: 14, color: '#9a9a8e', lineHeight: 1.6 }}>
                {['1 full analysis per day', 'Latest tender offer only', 'No email alerts'].map((f, i) => (
                  <li key={i} style={{ paddingBottom: 10, borderBottom: '1px solid #1a1a18', marginBottom: 10, display: 'flex', gap: 10 }}>
                    <span style={{ color: '#333' }}>—</span> {f}
                  </li>
                ))}
              </ul>
              <a href="/dashboard" className="btn-outline" style={{ marginTop: 24, display: 'block', textAlign: 'center' }}>View free analysis</a>
            </div>

            {/* PRO */}
            <div style={{ background: '#111', border: '1px solid #b8f54a', borderRadius: 4, padding: '32px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: -1, right: 24, background: '#b8f54a', color: '#0a0a0a', fontSize: 10, fontFamily: 'DM Sans, sans-serif', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: '0 0 4px 4px' }}>Most popular</div>
              <div className="sans" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#b8f54a', marginBottom: 20 }}>Pro</div>
              <div className="serif" style={{ fontSize: 40, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 4 }}>$9<span className="sans" style={{ fontSize: 16, fontWeight: 400, color: '#6b6b5e' }}>/mo</span></div>
              <div className="sans muted" style={{ fontSize: 13, marginBottom: 28 }}>Cancel anytime</div>
              <ul className="sans" style={{ listStyle: 'none', fontSize: 14, color: '#9a9a8e', lineHeight: 1.6 }}>
                {[
                  'All active tender offers',
                  'Full AI analysis on every filing',
                  'Real-time email alerts',
                  'BUY / WATCH / AVOID signals',
                  'Market price vs offer price',
                ].map((f, i) => (
                  <li key={i} style={{ paddingBottom: 10, borderBottom: '1px solid #1e1e1c', marginBottom: 10, display: 'flex', gap: 10 }}>
                    <span style={{ color: '#b8f54a' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href="/subscribe" className="btn-primary" style={{ marginTop: 24, display: 'block', textAlign: 'center' }}>Start for $9/month →</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '80px 40px', borderTop: '1px solid #1a1a18' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div className="sans" style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b6b5e', marginBottom: 48 }}>FAQ</div>
          {[
            {
              q: 'What is a tender offer?',
              a: 'A tender offer is when a company (or a third party) offers to buy shares from shareholders at a fixed price, usually above the current market price. If you buy shares below that price and tender them, you make the difference.'
            },
            {
              q: 'How is StockSteal different from just checking EDGAR myself?',
              a: 'EDGAR publishes raw legal documents of 40-80 pages. StockSteal reads them automatically, extracts the key numbers, fetches the current market price, calculates the premium, and gives you a plain-English recommendation — all within 60 seconds of the filing.'
            },
            {
              q: 'How often are new opportunities added?',
              a: 'The system checks EDGAR twice daily on trading days. When a new tender offer is detected, it is analyzed and added to your dashboard automatically. You also receive an email alert.'
            },
            {
              q: 'Is this investment advice?',
              a: 'No. StockSteal provides information and analysis for educational purposes only. Always do your own research and consult a financial advisor before making investment decisions.'
            },
          ].map((faq, i) => (
            <div key={i} style={{ borderBottom: '1px solid #1a1a18', padding: '24px 0' }}>
              <h3 className="sans" style={{ fontSize: 15, fontWeight: 500, color: '#e8e4d9', marginBottom: 10 }}>{faq.q}</h3>
              <p className="sans" style={{ fontSize: 14, color: '#6b6b5e', lineHeight: 1.7 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #1a1a18', padding: '32px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span className="serif" style={{ fontSize: 16, fontWeight: 600 }}>StockSteal</span>
          <p className="sans muted" style={{ fontSize: 12 }}>
            Not investment advice. For informational purposes only. Data sourced from SEC EDGAR.
          </p>
        </div>
      </footer>
    </div>
  )
}