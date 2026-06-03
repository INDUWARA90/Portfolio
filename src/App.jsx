import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
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
import { getPortfolioContent, resetPortfolioContent, savePortfolioContent } from './lib/portfolioContent'

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
    await savePortfolioContent(nextContent)
    setContent(nextContent)
  }

  async function resetContent() {
    const defaultContent = await resetPortfolioContent()
    setContent(defaultContent)
  }

  return (
    <div className="page-shell min-h-screen overflow-x-hidden text-white">
      {(isContentLoading || contentError) && (
        <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-md border border-white/10 bg-slate-950/90 px-4 py-2 text-sm text-slate-200 shadow-xl">
          {isContentLoading ? 'Loading portfolio content...' : `Firebase: ${contentError}`}
        </div>
      )}

      <Header
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
