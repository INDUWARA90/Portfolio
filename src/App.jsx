import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { FiAlertCircle, FiCloud } from 'react-icons/fi'
import AdminDashboard from './components/dashboard/AdminDashboard'
import DashboardLock from './components/dashboard/DashboardLock'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import About from './components/sections/About'
import Contact from './components/sections/Contact'
import Experience from './components/sections/Experience'
import Hero from './components/sections/Hero'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import { initialContent } from './data/siteContent'
import { auth } from './lib/firebase'
import { getPortfolioContent, getSafePortfolioContent, resetPortfolioContent, savePortfolioContent } from './lib/portfolioContent'

export default function App() {
  const [content, setContent] = useState(initialContent)
  const [isContentLoading, setIsContentLoading] = useState(true)
  const [contentError, setContentError] = useState('')
  const [dashboardOpen, setDashboardOpen] = useState(false)
  const [dashboardUnlocked, setDashboardUnlocked] = useState(false)

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setDashboardUnlocked(Boolean(user))
    })
  }, [])

  useEffect(() => {
    let isMounted = true

    async function loadContent() {
      try {
        const savedContent = await getPortfolioContent()

        if (isMounted) {
          setContent(savedContent)
          setContentError('')
        }
      } catch (error) {
        if (isMounted) {
          setContentError(error.message)
        }
      } finally {
        if (isMounted) {
          setIsContentLoading(false)
        }
      }
    }

    loadContent()

    return () => {
      isMounted = false
    }
  }, [])

  async function updateContent(nextContent) {
    const safeContent = getSafePortfolioContent(nextContent)
    await savePortfolioContent(safeContent)
    setContent(safeContent)
  }

  async function resetContent() {
    const defaultContent = await resetPortfolioContent()
    setContent(defaultContent)
  }

  return (
    <div className="page-shell min-h-screen overflow-x-hidden text-white">
      {(isContentLoading || contentError) && (
        <div
          className={`fixed right-4 top-4 z-50 flex w-[calc(100%-2rem)] max-w-md items-center gap-3 rounded-md border px-4 py-3 text-sm shadow-2xl backdrop-blur sm:w-96 ${
            contentError
              ? 'border-red-300/30 bg-red-950/85 text-red-100'
              : 'border-teal-200/25 bg-slate-950/85 text-slate-100'
          }`}
        >
          <span
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-md ${
              contentError ? 'bg-red-300 text-red-950' : 'bg-teal-300 text-slate-950'
            }`}
          >
            {contentError ? <FiAlertCircle /> : <FiCloud />}
          </span>
          <div>
            <p className="font-black">{isContentLoading ? 'Syncing Portfolio' : 'Firebase Connection Issue'}</p>
            <p className="mt-0.5 text-xs opacity-80">
              {isContentLoading ? 'Loading the latest content from Firestore...' : contentError}
            </p>
          </div>
        </div>
      )}

      <Header
        profile={content.profile}
        socials={content.socials}
        onOpenDashboard={() => setDashboardOpen(true)}
      />

      <main className="relative z-10">
        <Hero profile={content.profile} socials={content.socials} stats={content.stats} />
        <About profile={content.profile} services={content.services} />
        <Skills skills={content.skills} />
        <Projects projects={content.projects} />
        <Experience experience={content.experience} education={content.education} />
        <Contact profile={content.profile} />
      </main>

      <Footer profile={content.profile} socials={content.socials} />
      {dashboardOpen && !dashboardUnlocked && (
        <DashboardLock
          onUnlock={() => setDashboardUnlocked(true)}
          onClose={() => setDashboardOpen(false)}
        />
      )}
      {dashboardOpen && dashboardUnlocked && (
        <AdminDashboard
          content={content}
          setContent={updateContent}
          onReset={resetContent}
          onClose={() => setDashboardOpen(false)}
        />
      )}
    </div>
  )
}
