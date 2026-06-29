import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/unsubscribe')({
  head: () => ({
    meta: [
      { title: 'Unsubscribe — Pondok Peptides' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: UnsubscribePage,
})

type State =
  | { kind: 'loading' }
  | { kind: 'invalid'; message: string }
  | { kind: 'ready' }
  | { kind: 'already' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'error'; message: string }

function UnsubscribePage() {
  const [state, setState] = useState<State>({ kind: 'loading' })
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const t = params.get('token')
    if (!t) {
      setState({ kind: 'invalid', message: 'Missing unsubscribe token.' })
      return
    }
    setToken(t)
    fetch(`/email/unsubscribe?token=${encodeURIComponent(t)}`)
      .then(async (r) => {
        const j = await r.json().catch(() => ({}))
        if (!r.ok) return setState({ kind: 'invalid', message: j.error || 'Invalid or expired link.' })
        if (j.valid === false && j.reason === 'already_unsubscribed') return setState({ kind: 'already' })
        if (j.valid) return setState({ kind: 'ready' })
        setState({ kind: 'invalid', message: 'Unable to validate link.' })
      })
      .catch(() => setState({ kind: 'invalid', message: 'Network error.' }))
  }, [])

  const confirm = async () => {
    if (!token) return
    setState({ kind: 'submitting' })
    try {
      const r = await fetch('/email/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      const j = await r.json().catch(() => ({}))
      if (!r.ok) return setState({ kind: 'error', message: j.error || 'Failed to unsubscribe.' })
      if (j.success) return setState({ kind: 'success' })
      if (j.reason === 'already_unsubscribed') return setState({ kind: 'already' })
      setState({ kind: 'error', message: 'Unexpected response.' })
    } catch {
      setState({ kind: 'error', message: 'Network error.' })
    }
  }

  return (
    <div className="container-x py-20 max-w-xl mx-auto text-center">
      <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">Email preferences</p>
      <h1 className="font-display text-4xl text-ink mb-6">Unsubscribe</h1>
      {state.kind === 'loading' && <p className="text-muted-foreground">Checking your link…</p>}
      {state.kind === 'invalid' && <p className="text-error">{state.message}</p>}
      {state.kind === 'already' && <p className="text-muted-foreground">This email address is already unsubscribed.</p>}
      {state.kind === 'ready' && (
        <>
          <p className="text-muted-foreground mb-6">Click below to confirm you no longer wish to receive emails from Pondok Peptides.</p>
          <button onClick={confirm} className="bg-primary text-primary-foreground px-7 py-3.5 text-sm uppercase tracking-wider hover:bg-primary/90">Confirm unsubscribe</button>
        </>
      )}
      {state.kind === 'submitting' && <p className="text-muted-foreground">Processing…</p>}
      {state.kind === 'success' && <p className="text-ink">You've been unsubscribed. We're sorry to see you go.</p>}
      {state.kind === 'error' && <p className="text-error">{state.message}</p>}
    </div>
  )
}
