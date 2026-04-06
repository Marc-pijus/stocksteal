export default function TermsOfService() {
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
        <h1 className="serif" style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>Terms of Service</h1>
        <p className="sans" style={{ fontSize: 13, color: '#6b6b5a', marginBottom: 48 }}>Last updated: April 2026</p>

        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using StockSteal ("the Service") at www.stocksteal.com, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.</p>

        <h2>2. Description of Service</h2>
        <p>StockSteal is an information and analysis service that monitors SEC EDGAR filings related to tender offers, buyback programs, and other corporate actions. The Service provides automated analysis of public financial filings for informational and educational purposes.</p>

        <h2>3. Not Investment Advice</h2>
        <p><strong>The information provided by StockSteal is for informational and educational purposes only and does not constitute investment advice, financial advice, trading advice, or any other type of advice.</strong></p>
        <p>StockSteal is not a registered investment advisor, broker-dealer, or financial planner. Nothing on this Service should be construed as an offer to buy or sell securities or as a recommendation to make any investment.</p>
        <p>You should always conduct your own research and due diligence, and consult with a qualified financial advisor before making any investment decisions. Past performance of any analysis or signal is not indicative of future results.</p>

        <h2>4. Subscription and Payment</h2>
        <h3>Subscription plans</h3>
        <p>StockSteal offers a paid subscription plan (StockSteal Pro) at $9 per month. Payment is processed securely by Stripe.</p>

        <h3>Billing</h3>
        <p>Subscriptions are billed monthly on a recurring basis. Your subscription will automatically renew each month unless you cancel before the renewal date.</p>

        <h3>Cancellation</h3>
        <p>You may cancel your subscription at any time. Upon cancellation, you will retain access to the Service until the end of your current billing period. We do not offer refunds for partial months.</p>

        <h3>Price changes</h3>
        <p>We reserve the right to modify subscription prices. We will notify you at least 30 days in advance of any price changes. Continued use of the Service after a price change constitutes acceptance of the new price.</p>

        <h2>5. User Accounts</h2>
        <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account at <a href="mailto:contact@stocksteal.com">contact@stocksteal.com</a>.</p>
        <p>You must be at least 18 years old to create an account and use the Service.</p>

        <h2>6. Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Service for any unlawful purpose</li>
          <li>Share your account credentials with others</li>
          <li>Reproduce, redistribute, or resell the content of the Service without permission</li>
          <li>Attempt to gain unauthorized access to any part of the Service</li>
          <li>Use automated tools to scrape or extract data from the Service</li>
          <li>Use the Service to make investment decisions on behalf of others without appropriate authorization</li>
        </ul>

        <h2>7. Data Sources and Accuracy</h2>
        <p>StockSteal sources data from the U.S. Securities and Exchange Commission's EDGAR database, which is publicly available. While we strive for accuracy, we cannot guarantee the completeness, timeliness, or accuracy of the information provided.</p>
        <p>Market prices are sourced from Polygon.io and may be delayed. Always verify current prices with your broker before making investment decisions.</p>
        <p>StockSteal is not affiliated with the U.S. Securities and Exchange Commission.</p>

        <h2>8. Limitation of Liability</h2>
        <p>To the maximum extent permitted by applicable law, StockSteal shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill, arising from your use of or inability to use the Service.</p>
        <p>StockSteal's total liability to you for any claims arising from your use of the Service shall not exceed the amount you paid for the Service in the 12 months preceding the claim.</p>

        <h2>9. Disclaimer of Warranties</h2>
        <p>The Service is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that the Service will be uninterrupted, error-free, or free of viruses or other harmful components.</p>

        <h2>10. Intellectual Property</h2>
        <p>All content, design, and technology of StockSteal is the property of StockSteal and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.</p>
        <p>SEC filings referenced by the Service are public documents and the property of their respective filers.</p>

        <h2>11. Changes to Terms</h2>
        <p>We reserve the right to modify these Terms of Service at any time. We will notify you of significant changes by email or by posting a notice on the Service. Your continued use of the Service after changes constitutes acceptance of the new terms.</p>

        <h2>12. Governing Law</h2>
        <p>These Terms of Service shall be governed by and construed in accordance with applicable laws. Any disputes shall be resolved through good-faith negotiation before resorting to formal legal proceedings.</p>

        <h2>13. Contact</h2>
        <p>If you have any questions about these Terms of Service, please contact us at:</p>
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