import Link from 'next/link'

const sampleAnalysis = {
  ticker: 'SCHL',
  company: 'Scholastic Corporation',
  form: 'SC TO-I',
  fileDate: 'March 28, 2026',
  marketPrice: 39.20,
  offerPrice: 45.00,
  premium: 14.8,
  recommendation: 'WATCH',
  analysis: `Scholastic has filed an issuer tender offer to repurchase shares at **$45.00 per share** in cash. With the stock currently trading at $39.20, this represents a **14.8% premium** over the current market price.\n\n**Offer Terms:** Up to $150M in shares at $45.00 fixed price. Expiration in 20 business days. No financing condition — fully funded from existing cash reserves.\n\n**Opportunity:** If you purchase shares below $45.00 and tender them, you lock in a risk-adjusted return of up to 14.8% in approximately 4 weeks. The company has a strong balance sheet with $280M in cash, making completion highly likely.\n\n**Key Risks:** Proration risk if oversubscribed — you may not get all shares accepted. Share price may decline if offer fails or is withdrawn.\n\n**Recommendation: WATCH** — Monitor the offer expiration date and proration levels. If the stock dips below $42, the risk/reward becomes more attractive.`
}

export default function LandingPage() {
  return (
    <div style={{
      fontFamily: '"Georgia", "Times New Roman", serif',
      background: '#faf8f3',
      color: '#1a1a16',
      minHeight: '100vh',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Source+Sans+3:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .serif { font-family: 'Playfair Display', Georgia, serif; }
        .sans { font-family: 'Source Sans 3', system-ui, sans-serif; }
        .muted { color: #6b6b5a; }
        .ink { color: #1a1a16; }
        .red { color: #c0392b; }
        a { color: inherit; }
        .divider { border: none; border-top: 1px solid #e0ddd4; }
        .thin-divider { border: none; border-top: 1px solid #ede9e0; }
        .card {
          background: #fff;
          border: 1px solid #e0ddd4;
        }
        .btn-primary {
          background: #1a1a16;
          color: #faf8f3;
          border: none;
          padding: 12px 28px;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          letter-spacing: 0.04em;
          text-decoration: none;
          display: inline-block;
          transition: background 0.15s;
        }
        .btn-primary:hover { background: #333330; }
        .btn-outline {
          background: transparent;
          color: #1a1a16;
          border: 1px solid #1a1a16;
          padding: 11px 24px;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 14px;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: all 0.15s;
          letter-spacing: 0.02em;
        }
        .btn-outline:hover { background: #1a1a16; color: #faf8f3; }
        .tag {
          display: inline-block;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 3px 8px;
          border: 1px solid;
        }
        .tag-buy { color: #1a6b35; border-color: #1a6b35; background: #f0f8f3; }
        .tag-watch { color: #8b5e00; border-color: #8b5e00; background: #fdf8f0; }
        .tag-avoid { color: #c0392b; border-color: #c0392b; background: #fdf3f2; }
        .tag-neutral { color: #6b6b5a; border-color: #c8c4b8; background: #f8f6f0; }
        .ticker {
          font-family: 'Source Sans 3', monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: #c0392b;
        }
        .metric-val {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .section-label {
          font-family: 'Source Sans 3', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #6b6b5a;
        }
        .blur-row {
          filter: blur(4px);
          user-select: none;
          pointer-events: none;
        }
        input[type="email"] {
          border: 1px solid #c8c4b8;
          background: #fff;
          padding: 11px 16px;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 14px;
          color: #1a1a16;
          outline: none;
          width: 100%;
        }
        input[type="email"]:focus { border-color: #1a1a16; }
        input[type="email"]::placeholder { color: #a8a89a; }
        .prose p { margin-bottom: 14px; line-height: 1.8; color: #3a3a32; }
        .prose strong { color: #1a1a16; font-weight: 600; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade { animation: fadeIn 0.5s ease forwards; }
        .fade-2 { animation: fadeIn 0.5s 0.1s ease forwards; opacity: 0; }
        .fade-3 { animation: fadeIn 0.5s 0.2s ease forwards; opacity: 0; }
      `}</style>

      {/* TOP BAR */}
      <div style={{ background: '#1a1a16', color: '#faf8f3', padding: '8px 40px', textAlign: 'center' }}>
        <span className="sans" style={{ fontSize: 12, letterSpacing: '0.04em' }}>
          Early access — First 100 subscribers at <strong>$9/month</strong> · No credit card required to try
        </span>
      </div>

      {/* MASTHEAD */}
      <header style={{ borderBottom: '3px solid #1a1a16', padding: '0 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ padding: '20px 0 16px', textAlign: 'center', borderBottom: '1px solid #e0ddd4', marginBottom: 14 }}>
            <h1 className="serif" style={{ fontSize: 48, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1 }}>StockSteal</h1>
            <p className="sans" style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6b6b5a', marginTop: 6 }}>
              SEC Tender Offer Intelligence · Published Daily
            </p>
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 14 }}>
            <div style={{ display: 'flex', gap: 28 }}>
              {['Opportunities', 'How it works', 'Pricing', 'FAQ'].map(item => (
                <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="sans" style={{ fontSize: 13, letterSpacing: '0.04em', textDecoration: 'none', color: '#3a3a32' }}>{item}</a>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <a href="/dashboard" className="btn-outline" style={{ padding: '7px 16px', fontSize: 12 }}>View dashboard</a>
              <a href="#pricing" className="btn-primary" style={{ padding: '7px 16px', fontSize: 12 }}>Subscribe $9/mo</a>
            </div>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section style={{ padding: '60px 40px 48px', borderBottom: '1px solid #e0ddd4' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 60, alignItems: 'start' }}>
          <div>
            <div className="sans fade" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#c0392b', marginBottom: 20, fontWeight: 600 }}>
              Special Situations · Tender Offers · Corporate Actions
            </div>
            <h2 className="serif fade-2" style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 24 }}>
              Every U.S. tender offer,<br />
              analyzed within <em>60 seconds</em><br />
              of SEC filing.
            </h2>
            <p className="sans fade-3" style={{ fontSize: 16, lineHeight: 1.75, color: '#4a4a3e', maxWidth: 540, marginBottom: 32 }}>
              StockSteal monitors EDGAR around the clock, reads the legal documents so you don't have to, and delivers a clear BUY / WATCH / AVOID signal with the numbers that matter — offer price, current price, premium, and expiration.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a href="#example" className="btn-primary">Read a sample analysis ↓</a>
              <a href="#pricing" className="btn-outline">Start for $9/month</a>
            </div>
          </div>

          {/* NEWSLETTER SIGNUP */}
          <div style={{ background: '#fff', border: '1px solid #e0ddd4', padding: '28px 28px 24px' }}>
            <div className="section-label" style={{ marginBottom: 16 }}>Free daily digest</div>
            <h3 className="serif" style={{ fontSize: 22, fontWeight: 600, marginBottom: 10, lineHeight: 1.3 }}>Get tender offer alerts in your inbox</h3>
            <p className="sans" style={{ fontSize: 13, color: '#6b6b5a', lineHeight: 1.6, marginBottom: 20 }}>
              One email per day when new opportunities are detected. Free forever. No spam.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input type="email" placeholder="your@email.com" />
              <button className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                Get free alerts →
              </button>
            </div>
            <p className="sans" style={{ fontSize: 11, color: '#a8a89a', marginTop: 12, lineHeight: 1.5 }}>
              By subscribing you agree to receive daily emails. Unsubscribe at any time. Not investment advice.
            </p>
            <hr className="thin-divider" style={{ margin: '20px 0 16px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {[['500+', 'Offers tracked'], ['~15', 'Active monthly'], ['$9', 'Full access']].map(([v, l]) => (
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
              <div className="section-label" style={{ marginBottom: 10 }}>Sample analysis · Free</div>
              <h2 className="serif" style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.01em' }}>Today's featured opportunity</h2>
            </div>
            <span className="tag tag-watch">Latest filing</span>
          </div>

          <div className="card" style={{ padding: '32px 36px' }}>
            {/* Filing header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <span className="ticker">{sampleAnalysis.ticker}</span>
                  <span className="tag tag-neutral">Issuer buyback</span>
                  <span className="sans muted" style={{ fontSize: 12 }}>{sampleAnalysis.fileDate}</span>
                </div>
                <h3 className="serif" style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.01em' }}>{sampleAnalysis.company}</h3>
                <p className="sans muted" style={{ fontSize: 13, marginTop: 3 }}>{sampleAnalysis.form} · NASDAQ Global Select Market</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="serif" style={{ fontSize: 32, fontWeight: 600 }}>${sampleAnalysis.marketPrice}</div>
                <div className="sans" style={{ fontSize: 12, color: '#6b6b5a', marginTop: 2 }}>Last close</div>
              </div>
            </div>

            <hr className="divider" style={{ marginBottom: 24 }} />

            {/* Key metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, marginBottom: 28, border: '1px solid #e0ddd4' }}>
              {[
                { label: 'Offer price', value: `$${sampleAnalysis.offerPrice}` },
                { label: 'Premium to market', value: `+${sampleAnalysis.premium}%` },
                { label: 'Form type', value: sampleAnalysis.form },
                { label: 'Signal', value: sampleAnalysis.recommendation },
              ].map((m, i) => (
                <div key={i} style={{ padding: '16px 20px', borderRight: i < 3 ? '1px solid #e0ddd4' : 'none', background: i === 1 ? '#f8f6f0' : 'transparent' }}>
                  <div className="sans" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b6b5a', marginBottom: 6 }}>{m.label}</div>
                  <div className="serif" style={{ fontSize: 22, fontWeight: 600, color: i === 1 ? '#1a6b35' : '#1a1a16' }}>{m.value}</div>
                </div>
              ))}
            </div>

            {/* Analysis */}
            <div>
              <div className="section-label" style={{ marginBottom: 14 }}>Full analysis · Based on SEC filing document</div>
              <div className="sans prose" style={{ fontSize: 15 }}>
                {sampleAnalysis.analysis.split('\n\n').map((para, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                ))}
              </div>
            </div>
          </div>

          {/* Blurred locked cards */}
          <div style={{ marginTop: 4 }}>
            <div style={{ background: '#fff3f2', border: '1px solid #f0d8d6', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
              <p className="sans" style={{ fontSize: 13, color: '#8b2020' }}>
                <strong>3 more active opportunities</strong> are available to Pro subscribers.
              </p>
              <a href="#pricing" className="btn-primary" style={{ background: '#c0392b', fontSize: 13, padding: '9px 20px' }}>Unlock for $9/month →</a>
            </div>
            {[
              { ticker: 'DAWN', company: 'Day One Biopharmaceuticals', type: 'Third-party offer', premium: '+18.2%', rec: 'BUY' },
              { ticker: 'RBNE', company: 'Robin Energy Ltd.', type: 'Issuer buyback', premium: '+9.4%', rec: 'WATCH' },
              { ticker: 'MRSN', company: 'Mersana Therapeutics', type: 'Third-party offer', premium: '-14.0%', rec: 'AVOID' },
            ].map((f, i) => (
              <div key={i} className="blur-row" style={{ background: '#fff', border: '1px solid #e0ddd4', borderTop: 'none', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span className="ticker">{f.ticker}</span>
                  <span className="sans" style={{ fontSize: 15, color: '#1a1a16' }}>{f.company}</span>
                  <span className="tag tag-neutral" style={{ fontSize: 10 }}>{f.type}</span>
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
          <div className="section-label" style={{ marginBottom: 40 }}>How it works</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid #e0ddd4' }}>
            {[
              { n: 'I', title: 'EDGAR monitored continuously', body: 'Every SC TO-I and SC TO-T filing is detected within minutes of publication on the SEC database. No manual searching required on your part.' },
              { n: 'II', title: 'Legal documents parsed by AI', body: 'Our system reads the full offering document — sometimes 80 pages — and extracts offer price, expiration date, conditions, and total deal size automatically.' },
              { n: 'III', title: 'Clear signal delivered to you', body: 'You receive a BUY, WATCH, or AVOID recommendation with specific numbers, risk factors, and what to monitor next — in plain English, within 60 seconds.' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '32px 28px', borderRight: i < 2 ? '1px solid #e0ddd4' : 'none' }}>
                <div className="serif" style={{ fontSize: 40, color: '#e0ddd4', fontWeight: 700, lineHeight: 1, marginBottom: 20 }}>{s.n}</div>
                <h3 className="sans" style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#1a1a16', marginBottom: 10 }}>{s.title}</h3>
                <p className="sans" style={{ fontSize: 14, color: '#6b6b5a', lineHeight: 1.7 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: '56px 40px', borderBottom: '1px solid #e0ddd4' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="section-label" style={{ marginBottom: 40 }}>Pricing</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 700 }}>
            <div className="card" style={{ padding: '28px' }}>
              <div className="section-label" style={{ marginBottom: 16 }}>Free</div>
              <div className="serif" style={{ fontSize: 36, fontWeight: 600, marginBottom: 4 }}>$0</div>
              <div className="sans muted" style={{ fontSize: 13, marginBottom: 24 }}>No credit card required</div>
              <ul className="sans" style={{ listStyle: 'none', fontSize: 14, color: '#4a4a3e', lineHeight: 1.6 }}>
                {['1 featured analysis per day', 'Email alerts (free digest)', 'Latest filing only'].map((f, i) => (
                  <li key={i} style={{ padding: '9px 0', borderBottom: '1px solid #ede9e0', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: '#c8c4b8', marginTop: 2 }}>–</span>{f}
                  </li>
                ))}
              </ul>
              <a href="/dashboard" className="btn-outline" style={{ marginTop: 24, display: 'block', textAlign: 'center' }}>Start free</a>
            </div>

            <div style={{ background: '#1a1a16', color: '#faf8f3', padding: '28px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, right: 24, background: '#c0392b', color: '#fff', fontSize: 10, fontFamily: 'Source Sans 3, sans-serif', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 12px' }}>Early access</div>
              <div className="section-label" style={{ marginBottom: 16, color: '#a8a89a' }}>Pro</div>
              <div className="serif" style={{ fontSize: 36, fontWeight: 600, marginBottom: 4, color: '#faf8f3' }}>$9<span className="sans" style={{ fontSize: 15, fontWeight: 300, color: '#6b6b5a' }}>/month</span></div>
              <div className="sans" style={{ fontSize: 13, color: '#6b6b5a', marginBottom: 24 }}>Cancel anytime</div>
              <ul className="sans" style={{ listStyle: 'none', fontSize: 14, color: '#c8c4b8', lineHeight: 1.6 }}>
                {[
                  'All active tender offers',
                  'Full AI analysis on every filing',
                  'Real-time email alerts',
                  'BUY / WATCH / AVOID signals',
                  'Offer price vs market price',
                  'Premium calculation',
                ].map((f, i) => (
                  <li key={i} style={{ padding: '9px 0', borderBottom: '1px solid #2a2a26', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: '#c0392b', marginTop: 2 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href="/subscribe" className="btn-primary" style={{ marginTop: 24, display: 'block', textAlign: 'center', background: '#fff', color: '#1a1a16' }}>Subscribe for $9/month →</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: '56px 40px', borderBottom: '1px solid #e0ddd4', background: '#fff' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div className="section-label" style={{ marginBottom: 40 }}>Frequently asked questions</div>
          {[
            { q: 'What is a tender offer?', a: 'A tender offer is when a company — or a third party — offers to buy shares from existing shareholders at a fixed price, usually above the current market price. If you buy shares below that price and tender them, you capture the difference as a return.' },
            { q: 'How is StockSteal different from checking EDGAR myself?', a: 'EDGAR publishes raw legal documents of 40–80 pages. StockSteal reads them automatically, extracts the key numbers, fetches the current market price, calculates the premium, and delivers a plain-English recommendation — all within 60 seconds of the filing.' },
            { q: 'How often are new opportunities added?', a: 'The system checks EDGAR twice daily on trading days. When a new tender offer is detected it is analyzed and added to your dashboard automatically. Pro subscribers also receive an immediate email alert.' },
            { q: 'Is this investment advice?', a: 'No. StockSteal provides information and analysis for educational and informational purposes only. Always conduct your own research and consult a qualified financial advisor before making investment decisions.' },
          ].map((faq, i) => (
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
          <span className="serif" style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>StockSteal</span>
          <p className="sans" style={{ fontSize: 12, color: '#6b6b5a', maxWidth: 480, textAlign: 'center' }}>
            Data sourced from SEC EDGAR. Not investment advice. For informational purposes only. StockSteal is not affiliated with the U.S. Securities and Exchange Commission.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            <a href="#" className="sans muted" style={{ fontSize: 12, textDecoration: 'none' }}>Privacy</a>
            <a href="#" className="sans muted" style={{ fontSize: 12, textDecoration: 'none' }}>Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}