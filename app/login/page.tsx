'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setMessage(error.message)
      else setMessage('Check your email to confirm your account.')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage(error.message)
      else window.location.href = '/dashboard'
    }
    setLoading(false)
  }

  return (
    <div style={{ fontFamily: 'Georgia, serif', background: '#faf8f3', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Source+Sans+3:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input { border: 1px solid #c8c4b8; background: #fff; padding: 11px 16px; font-family: 'Source Sans 3', sans-serif; font-size: 14px; color: #1a1a16; outline: none; width: 100%; margin-bottom: 12px; }
        input:focus { border-color: #1a1a16; }
      `}</style>

      <div style={{ background: '#fff', border: '1px solid #e0ddd4', padding: '40px', width: '100%', maxWidth: 400 }}>
        <a href="/" style={{ display: 'block', textAlign: 'center', marginBottom: 28, textDecoration: 'none' }}>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 700, color: '#1a1a16' }}>StockSteal</span>
        </a>

        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 600, marginBottom: 24, textAlign: 'center' }}>
          {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
        </h2>

        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit" disabled={loading} style={{ width: '100%', background: '#1a1a16', color: '#faf8f3', border: 'none', padding: '12px', fontFamily: 'Source Sans 3, sans-serif', fontSize: 14, fontWeight: 500, cursor: 'pointer', letterSpacing: '0.04em' }}>
            {loading ? 'Loading...' : mode === 'login' ? 'Sign in →' : 'Create account →'}
          </button>
        </form>

        {message && (
          <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: 13, marginTop: 16, color: message.includes('error') || message.includes('Invalid') ? '#c0392b' : '#1a6b35', textAlign: 'center' }}>
            {message}
          </p>
        )}

        <p style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: 13, marginTop: 20, textAlign: 'center', color: '#6b6b5a' }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} style={{ background: 'none', border: 'none', color: '#1a1a16', cursor: 'pointer', fontSize: 13, textDecoration: 'underline', fontFamily: 'Source Sans 3, sans-serif' }}>
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  )
}