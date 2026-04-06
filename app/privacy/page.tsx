export default function PrivacyPolicy() {
  return (
    <div style={{ fontFamily: '"Georgia", "Times New Roman", serif', background: '#faf8f3', color: '#1a1a16', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Source+Sans+3:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .serif { font-family: 'Playfair Display', Georgia, serif; }
        .sans { font-family: 'Source Sans 3', system-ui, sans-serif; }
        h2 { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 600; margin: 32px 0 12px; color: #1a1a16; }
        h3 { font-family: 'Source Sans 3', sans-serif; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; margin: 24px 0 8px; color: #1a1a16; }
        p { font-family: 'Source Sans 3', sans-serif; font-size: 15px; line-height: 1.8; color: #3a3a32; margin-bottom: 14px; }
        ul { font-family: 'Source Sans 3', sans-serif; font-size: 15px; line-height: 1.8; color: #3a3a32; margin-bottom: 14px; padding-left: 20px; }
        li { margin-bottom: 6px; }
        a { color: #1a1a16; }
      `}</style>

      {/* Header */}
      <header style={{ borderBottom: '3px solid #1a1a16', padding: '0 40px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <span className="serif" style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', color: '#1a1a16' }}>StockSteal</span>
          </a>
          <a href="/" className="sans" style={{ fontSize: 13, color: '#6b6b5a', textDecoration: 'none' }}>← Back to home</a>
        </div>
      </header>

      {/* Content */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 40px' }}>
        <div className="sans" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6b6b5a', marginBottom: 16 }}>Legal</div>
        <h1 className="serif" style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>Privacy Policy</h1>
        <p className="sans" style={{ fontSize: 13, color: '#6b6b5a', marginBottom: 48 }}>Last updated: April 2026</p>

        <h2>1. Introduction</h2>
        <p>StockSteal ("we", "us", or "our") operates the website www.stocksteal.com (the "Service"). This Privacy Policy explains how we collect, use, and protect your personal information when you use our Service.</p>
        <p>By using StockSteal, you agree to the collection and use of information in accordance with this policy.</p>

        <h2>2. Information We Collect</h2>
        <h3>Information you provide directly</h3>
        <ul>
          <li><strong>Email address</strong> — when you create an account or subscribe to our service</li>
          <li><strong>Payment information</strong> — processed securely by Stripe. We do not store your credit card details</li>
        </ul>

        <h3>Information collected automatically</h3>
        <ul>
          <li><strong>Usage data</strong> — pages visited, time spent on the site, browser type, IP address</li>
          <li><strong>Cookies</strong> — session cookies required for authentication. We do not use tracking or advertising cookies</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide and maintain the Service</li>
          <li>Send you email alerts about new tender offer opportunities (subscribers only)</li>
          <li>Process your subscription payments via Stripe</li>
          <li>Respond to your inquiries and support requests</li>
          <li>Improve and optimize the Service</li>
        </ul>
        <p>We do not sell, trade, or rent your personal information to third parties.</p>

        <h2>4. Data Storage and Security</h2>
        <p>Your data is stored securely using Supabase, a cloud database provider. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
        <p>Passwords are encrypted and never stored in plain text. Payment data is processed entirely by Stripe and never stored on our servers.</p>

        <h2>5. Third-Party Services</h2>
        <p>We use the following third-party services to operate StockSteal:</p>
        <ul>
          <li><strong>Stripe</strong> — payment processing. <a href="https://stripe.com/privacy" target="_blank">Stripe Privacy Policy</a></li>
          <li><strong>Supabase</strong> — database and authentication. <a href="https://supabase.com/privacy" target="_blank">Supabase Privacy Policy</a></li>
          <li><strong>Resend</strong> — email delivery. <a href="https://resend.com/privacy" target="_blank">Resend Privacy Policy</a></li>
          <li><strong>Vercel</strong> — website hosting. <a href="https://vercel.com/legal/privacy-policy" target="_blank">Vercel Privacy Policy</a></li>
        </ul>

        <h2>6. Email Communications</h2>
        <p>If you subscribe to StockSteal Pro, you will receive email alerts when new investment opportunities are detected. You can unsubscribe at any time by contacting us at <a href="mailto:contact@stocksteal.com">contact@stocksteal.com</a>.</p>
        <p>We do not send marketing emails or share your email address with advertisers.</p>

        <h2>7. Data Retention</h2>
        <p>We retain your personal information for as long as your account is active or as needed to provide the Service. If you cancel your subscription and delete your account, we will delete your personal data within 30 days, except where we are required to retain it by law.</p>

        <h2>8. Your Rights</h2>
        <p>Under applicable data protection laws, you have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to processing of your data</li>
          <li>Request portability of your data</li>
        </ul>
        <p>To exercise any of these rights, contact us at <a href="mailto:contact@stocksteal.com">contact@stocksteal.com</a>.</p>

        <h2>9. Cookies</h2>
        <p>StockSteal uses only essential cookies necessary for the Service to function, specifically for user authentication. We do not use analytics, advertising, or tracking cookies.</p>

        <h2>10. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page with an updated date. Your continued use of the Service after changes constitutes acceptance of the new policy.</p>

        <h2>11. Contact</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at:</p>
        <p><strong>StockSteal</strong><br />
        Email: <a href="mailto:contact@stocksteal.com">contact@stocksteal.com</a><br />
        Website: <a href="https://www.stocksteal.com">www.stocksteal.com</a></p>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e0ddd4', padding: '24px 40px', marginTop: 40 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span className="serif" style={{ fontSize: 16, fontWeight: 700 }}>StockSteal</span>
          <div style={{ display: 'flex', gap: 20 }}>
            <a href="/privacy" className="sans" style={{ fontSize: 12, color: '#6b6b5a', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="/terms" className="sans" style={{ fontSize: 12, color: '#6b6b5a', textDecoration: 'none' }}>Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  )
}