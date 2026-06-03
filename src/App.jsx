import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { FiAlertCircle, FiCloud } from 'react-icons/fi'
import AdminDashboard from './components/dashboard/AdminDashboard'
import DashboardLock from './components/dashboard/DashboardLock'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import About from './components/sections/About'
import Certificates from './components/sections/Certificates'
import Contact from './components/sections/Contact'
import ContactCta from './components/sections/ContactCta'
import Experience from './components/sections/Experience'
import GithubPanel from './components/sections/GithubPanel'
import Hero from './components/sections/Hero'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import TechMarquee from './components/sections/TechMarquee'
import Testimonials from './components/sections/Testimonials'
import Reveal from './components/ui/Reveal'
import { initialContent } from './data/siteContent'
import { auth } from './lib/firebase'
import { getPortfolioContent, getSafePortfolioContent, resetPortfolioContent, savePortfolioContent } from './lib/portfolioContent'

export default function App() {
  const [content, setContent] = useState(initialContent)
  const [isContentLoading, setIsContentLoading] = useState(true)
  const [contentError, setContentError] = useState('')
  const [dashboardOpen, setDashboardOpen] = useState(false)
  const [dashboardUser, setDashboardUser] = useState(null)
  const dashboardUnlocked = Boolean(dashboardUser)

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setDashboardUser(user)
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
    <div className="page-shell min-h-screen overflow-x-hidden text-[#1F6F5F]">
      {isContentLoading && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#1F6F5F]/30 px-4 text-[#1F6F5F] backdrop-blur-md">
          <div className="w-full max-w-sm rounded-md border border-[#2FA084]/20 bg-white/95 p-6 text-center shadow-2xl">
            <div className="relative mx-auto grid h-16 w-16 place-items-center">
              <div className="absolute inset-0 animate-spin rounded-full border-2 border-[#6FCF97]/30 border-t-[#2FA084]" />
              
            </div>
            <h2 className="mt-5 text-2xl font-black">Loading Data</h2>
            <p className="mt-2 text-sm leading-6 text-[#1F6F5F]/70">Syncing the latest portfolio content from Firebase.</p>
          </div>
        </div>
      )}

      {contentError && (
        <div
          className={`fixed right-4 top-4 z-50 flex w-[calc(100%-2rem)] max-w-md items-center gap-3 rounded-md border px-4 py-3 text-sm shadow-2xl backdrop-blur sm:w-96 ${
            contentError
              ? 'border-red-300/30 bg-red-950/85 text-red-100'
              : 'border-[#2FA084]/25 bg-white/90 text-[#1F6F5F]'
          }`}
        >
          <span
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-md ${
              contentError ? 'bg-red-300 text-red-950' : 'bg-[#6FCF97] text-[#1F6F5F]'
            }`}
          >
            {contentError ? <FiAlertCircle /> : <FiCloud />}
          </span>
          <div>
            <p className="font-black">Firebase Connection Issue</p>
            <p className="mt-0.5 text-xs opacity-80">
              {contentError}
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
        <Reveal>
          <Hero profile={content.profile} socials={content.socials} stats={content.stats} />
        </Reveal>
        <TechMarquee skills={content.skills} />
        <Reveal>
          <About profile={content.profile} services={content.services} />
        </Reveal>
        <Reveal>
          <Skills skills={content.skills} />
        </Reveal>
        <Reveal>
          <Projects projects={content.projects} />
        </Reveal>
        <Reveal>
          <Experience experience={content.experience} education={content.education} />
        </Reveal>
        <Reveal>
          <Certificates certifications={content.certifications} />
        </Reveal>
        <Reveal>
          <GithubPanel github={content.github} socials={content.socials} />
        </Reveal>
        <Reveal>
          <Testimonials testimonials={content.testimonials} />
        </Reveal>
        <Reveal>
          <Contact profile={content.profile} />
        </Reveal>
        <Reveal>
          <ContactCta profile={content.profile} />
        </Reveal>
      </main>

      <Footer profile={content.profile} socials={content.socials} />
      {dashboardOpen && !dashboardUnlocked && (
        <DashboardLock
          onClose={() => setDashboardOpen(false)}
        />
      )}
      {dashboardOpen && dashboardUnlocked && (
        <AdminDashboard
          content={content}
          setContent={updateContent}
          onReset={resetContent}
          user={dashboardUser}
          onClose={() => setDashboardOpen(false)}
        />
      )}
    </div>
  )
}
