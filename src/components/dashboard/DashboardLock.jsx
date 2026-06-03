import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FiLock, FiX } from 'react-icons/fi'
import { auth } from '../../lib/firebase'

const authMessages = {
  'auth/configuration-not-found': 'Enable Email/Password sign-in in Firebase Authentication.',
  'auth/invalid-credential': 'Email or password is incorrect.',
  'auth/invalid-email': 'Enter a valid email address.',
  'auth/missing-password': 'Enter your password.',
  'auth/user-not-found': 'No Firebase user exists for this email.',
  'auth/wrong-password': 'Email or password is incorrect.',
}

function DashboardLock({ onUnlock, onClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [error, setError] = useState('')

  async function submitPassword(event) {
    event.preventDefault()
    setIsSigningIn(true)
    setError('')

    try {
      await signInWithEmailAndPassword(auth, email, password)
      onUnlock()
    } catch (signInError) {
      setError(authMessages[signInError.code] || signInError.message)
      setPassword('')
    } finally {
      setIsSigningIn(false)
    }
  }

  return (
    <div className="dashboard-modal fixed inset-0 z-50 grid place-items-center bg-slate-950/88 p-4 text-white backdrop-blur">
      <form onSubmit={submitPassword} className="dashboard-panel w-full max-w-md rounded-md border border-white/10 bg-[#101828] p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="grid h-12 w-12 place-items-center rounded-md bg-teal-300 text-2xl text-slate-950">
              <FiLock />
            </div>
            <h2 className="mt-5 text-3xl font-black">Dashboard Locked</h2>
            <p className="mt-2 text-sm text-slate-400">Sign in to manage portfolio content.</p>
          </div>
          <button type="button" onClick={onClose} className="icon-button" aria-label="Close dashboard lock">
            <FiX />
          </button>
        </div>

        <label className="mt-6 block text-sm font-bold text-slate-300">
          Email
          <input
            autoFocus
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            className="dashboard-input mt-2"
            placeholder="you@example.com"
          />
        </label>

        <label className="mt-6 block text-sm font-bold text-slate-300">
          Password
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            className="dashboard-input mt-2"
            placeholder="Enter password"
          />
        </label>

        {error && <p className="mt-3 text-sm font-bold text-red-300 light:text-red-700">{error}</p>}

        <button className="btn-primary mt-5 w-full gap-2 px-5 py-3 text-sm">
          <FiLock />
          {isSigningIn ? 'Signing In' : 'Unlock Dashboard'}
        </button>
      </form>
    </div>
  )
}

export default DashboardLock
