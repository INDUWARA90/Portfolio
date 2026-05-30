import { useEffect, useState } from 'react'

function ScrollTools() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function updateProgress() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0)
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <>
      <div className="fixed left-0 top-0 z-50 h-1 bg-cyan-300" style={{ width: `${progress}%` }} />
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-5 left-5 z-40 rounded-md border border-white/10 bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-xl light:bg-white light:text-slate-950">
        Top
      </button>
    </>
  )
}

export default ScrollTools
