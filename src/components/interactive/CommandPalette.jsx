import { useEffect, useMemo, useState } from 'react'

const baseCommands = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Projects', '#projects'],
  ['Experience', '#experience'],
  ['Certificates', '#certificates'],
  ['Contact', '#contact'],
]

function CommandPalette({ isOpen, onClose, onOpenDashboard }) {
  const [query, setQuery] = useState('')
  const commands = useMemo(() => baseCommands.filter(([label]) => label.toLowerCase().includes(query.toLowerCase())), [query])

  useEffect(() => {
    function handleKeyDown(event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        if (isOpen) onClose()
      }
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-[#1F6F5F]/42 p-4 backdrop-blur">
      <div className="mx-auto mt-24 w-full max-w-xl rounded-md border border-[#1F6F5F]/12 bg-white p-4 shadow-2xl light:bg-white">
        <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search commands..." className="w-full rounded-md border border-[#1F6F5F]/14 bg-[#EEEEEE]/70 px-4 py-3 text-[#1F6F5F] outline-none focus:border-[#2FA084] light:bg-slate-50 light:text-slate-950" />
        <div className="mt-4 space-y-2">
          {commands.map(([label, href]) => (
            <a key={label} href={href} onClick={onClose} className="block rounded-md px-4 py-3 text-[#1F6F5F] hover:bg-[#6FCF97]/16 light:text-slate-700">
              Go to {label}
            </a>
          ))}
          <button onClick={() => { onOpenDashboard(); onClose() }} className="block w-full rounded-md px-4 py-3 text-left text-[#2FA084] hover:bg-[#6FCF97]/16">
            Open Admin Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommandPalette
