import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendAlertEmail({
  to,
  ticker,
  company,
  form,
  marketPrice,
  analysis,
  hasDocument,
}: {
  to: string[]
  ticker: string | null
  company: string
  form: string
  marketPrice: number | null
  analysis: string
  hasDocument: boolean
}) {
  const subject = ticker
    ? `New opportunity: ${ticker} — ${form} filed`
    : `New opportunity: ${company} — ${form} filed`

  const formattedAnalysis = analysis
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>')

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body style="margin:0;padding:0;background:#faf8f3;font-family:Georgia,serif;">
      
      <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        
        <!-- Header -->
        <div style="border-bottom:3px solid #1a1a16;padding-bottom:16px;margin-bottom:32px;text-align:center;">
          <h1 style="font-family:Georgia,serif;font-size:28px;font-weight:700;color:#1a1a16;margin:0;letter-spacing:-0.02em;">StockSteal</h1>
          <p style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#6b6b5a;margin:6px 0 0;">New Opportunity Alert</p>
        </div>

        <!-- Alert badge -->
        <div style="background:#fff3f2;border:1px solid #f0d8d6;padding:10px 16px;margin-bottom:24px;display:inline-block;">
          <span style="font-family:Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#c0392b;">New filing detected</span>
        </div>

        <!-- Company -->
        <div style="margin-bottom:24px;">
          ${ticker ? `<span style="font-family:Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.08em;color:#c0392b;display:block;margin-bottom:8px;">${ticker}</span>` : ''}
          <h2 style="font-family:Georgia,serif;font-size:26px;font-weight:600;color:#1a1a16;margin:0 0 6px;letter-spacing:-0.01em;">${company}</h2>
          <p style="font-family:Arial,sans-serif;font-size:13px;color:#6b6b5a;margin:0;">${form} · Filed today</p>
        </div>

        <!-- Market price if available -->
        ${marketPrice ? `
        <div style="background:#f8f6f0;border:1px solid #e0ddd4;padding:16px 20px;margin-bottom:24px;">
          <p style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#6b6b5a;margin:0 0 6px;">Current market price</p>
          <p style="font-family:Georgia,serif;font-size:28px;font-weight:600;color:#1a1a16;margin:0;">$${marketPrice.toFixed(2)}</p>
        </div>
        ` : ''}

        <!-- Analysis -->
        <div style="border-top:1px solid #e0ddd4;padding-top:24px;margin-bottom:32px;">
          <p style="font-family:Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#6b6b5a;margin:0 0 16px;">
            AI Analysis · ${hasDocument ? 'Based on filing document' : 'General analysis'}
          </p>
          <div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.8;color:#3a3a32;">
            <p>${formattedAnalysis}</p>
          </div>
        </div>

        <!-- CTA -->
        <div style="text-align:center;margin-bottom:40px;">
          <a href="https://www.stocksteal.com/dashboard" style="background:#1a1a16;color:#faf8f3;text-decoration:none;padding:14px 32px;font-family:Arial,sans-serif;font-size:14px;font-weight:500;letter-spacing:0.04em;display:inline-block;">
            View full dashboard →
          </a>
        </div>

        <!-- Footer -->
        <div style="border-top:1px solid #e0ddd4;padding-top:20px;text-align:center;">
          <p style="font-family:Arial,sans-serif;font-size:11px;color:#a8a89a;line-height:1.6;margin:0;">
            You're receiving this because you're a StockSteal Pro subscriber.<br/>
            Data sourced from SEC EDGAR. Not investment advice.<br/>
            <a href="https://www.stocksteal.com" style="color:#6b6b5a;">Unsubscribe</a>
          </p>
        </div>

      </div>
    </body>
    </html>
  `

  await resend.emails.send({
    from: 'StockSteal <alerts@stocksteal.com>',
    to,
    subject,
    html,
  })
}

export async function sendWelcomeEmail(to: string) {
  const html = `
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:0;background:#faf8f3;font-family:Georgia,serif;">
      <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="border-bottom:3px solid #1a1a16;padding-bottom:16px;margin-bottom:32px;text-align:center;">
          <h1 style="font-family:Georgia,serif;font-size:28px;font-weight:700;color:#1a1a16;margin:0;">StockSteal</h1>
          <p style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#6b6b5a;margin:6px 0 0;">Welcome to Pro</p>
        </div>
        <h2 style="font-family:Georgia,serif;font-size:24px;font-weight:600;color:#1a1a16;margin:0 0 16px;">You're in. Welcome to StockSteal Pro.</h2>
        <p style="font-family:Arial,sans-serif;font-size:15px;line-height:1.75;color:#4a4a3e;margin:0 0 24px;">
          From now on, every time a new tender offer is detected and analyzed, you'll receive an instant email alert with the full analysis — offer price, market price, premium, and our BUY / WATCH / AVOID recommendation.
        </p>
        <div style="text-align:center;margin-bottom:40px;">
          <a href="https://www.stocksteal.com/dashboard" style="background:#1a1a16;color:#faf8f3;text-decoration:none;padding:14px 32px;font-family:Arial,sans-serif;font-size:14px;font-weight:500;letter-spacing:0.04em;display:inline-block;">
            Go to your dashboard →
          </a>
        </div>
        <div style="border-top:1px solid #e0ddd4;padding-top:20px;text-align:center;">
          <p style="font-family:Arial,sans-serif;font-size:11px;color:#a8a89a;">
            Data sourced from SEC EDGAR. Not investment advice.
          </p>
        </div>
      </div>
    </body>
    </html>
  `

  await resend.emails.send({
    from: 'StockSteal <alerts@stocksteal.com>',
    to,
    subject: 'Welcome to StockSteal Pro',
    html,
  })
}