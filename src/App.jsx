import { useState } from 'react'
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

export default function App() {
  const [content, setContent] = useState(initialContent)
  const [dashboardOpen, setDashboardOpen] = useState(false)
  const [dashboardUnlocked, setDashboardUnlocked] = useState(false)

  return (
    <div className="page-shell min-h-screen overflow-x-hidden text-white">
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
          setContent={setContent}
          onReset={() => setContent(initialContent)}
          onClose={() => setDashboardOpen(false)}
        />
      )}
    </div>
  )
}
