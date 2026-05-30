import { useState } from 'react'
import { FiLock, FiX } from 'react-icons/fi'

const DASHBOARD_PASSWORD = '12345'

function DashboardLock({ onUnlock, onClose }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function submitPassword(event) {
    event.preventDefault()

    if (password === DASHBOARD_PASSWORD) {
      setError('')
      onUnlock()
      return
    }

    setError('Incorrect password. Try again.')
    setPassword('')
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
            <p className="mt-2 text-sm text-slate-400">Enter the password to manage portfolio content.</p>
          </div>
          <button type="button" onClick={onClose} className="icon-button" aria-label="Close dashboard lock">
            <FiX />
          </button>
        </div>

        <label className="mt-6 block text-sm font-bold text-slate-300">
          Password
          <input
            autoFocus
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
          Unlock Dashboard
        </button>
      </form>
    </div>
  )
}

export default DashboardLock
