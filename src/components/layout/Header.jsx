import { useState } from 'react'
import { BiMenu, BiX } from 'react-icons/bi'
import { BsGithub, BsLinkedin } from 'react-icons/bs'

const navItems = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Projects', '#projects'],
  ['Experience', '#experience'],
  ['Feedback', '#feedback'],
  ['Contact', '#contact'],
]

function Header({ profile, socials, onOpenDashboard }) {
  const [isOpen, setIsOpen] = useState(false)
  const github = socials.find((social) => social.label === 'GitHub')?.href
  const linkedin = socials.find((social) => social.label === 'LinkedIn')?.href
  const brand = profile.name || 'Portfolio'

  const closeSidebar = () => setIsOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 text-[#1F6F5F] light:text-slate-950">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-md border border-[#1F6F5F]/10 bg-white/88 px-4 py-3 shadow-[0_18px_50px_rgba(31,111,95,0.12)] backdrop-blur-2xl light:border-slate-200 light:bg-white/95 light:shadow-[0_16px_45px_rgba(15,23,42,0.1)] md:px-5">
        <a href="#home" className="text-lg font-extrabold tracking-tight">
          {brand}<span className="text-[#2FA084] light:text-sky-600">.</span>
        </a>

        <ul className="hidden items-center gap-4 text-sm font-semibold text-[#1F6F5F]/75 light:text-slate-700 lg:flex">
          {navItems.map(([label, href]) => (
            <li key={label}>
              <a className="transition hover:text-[#2FA084] light:hover:text-sky-700" href={href}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          {github && (
            <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub" className="icon-button">
              <BsGithub />
            </a>
          )}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="icon-button">
              <BsLinkedin />
            </a>
          )}
          <button className="btn-secondary px-4 py-2 text-sm" onClick={onOpenDashboard}>
            Dashboard
          </button>
          <a href="#contact" className="btn-primary px-4 py-2 text-sm">
            Hire Me
          </a>
        </div>

        <button className="text-3xl lg:hidden" onClick={() => setIsOpen((open) => !open)} aria-label="Toggle menu">
          {isOpen ? <BiX /> : <BiMenu />}
        </button>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Navigation */}
      <div
        className={`fixed right-0 top-0 z-40 h-screen w-64 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } border-l border-[#1F6F5F]/10 bg-white/95 px-6 py-6 backdrop-blur-xl light:border-slate-200 light:bg-white/95 overflow-y-auto`}
      >
        <button
          onClick={closeSidebar}
          className="mb-8 ml-auto flex text-3xl text-[#1F6F5F] light:text-slate-950"
          aria-label="Close menu"
        >
          <BiX />
        </button>

        <nav className="flex flex-col gap-6">
          {navItems.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={closeSidebar}
              className="text-lg font-semibold text-[#1F6F5F] transition hover:text-[#2FA084] light:text-slate-700 light:hover:text-sky-600"
            >
              {label}
            </a>
          ))}

          <div className="border-t border-[#1F6F5F]/10 pt-6 light:border-slate-200">
            <div className="mb-4 flex gap-3">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="icon-button text-2xl transition hover:text-[#2FA084] light:hover:text-sky-600"
                >
                  <BsGithub />
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="icon-button text-2xl transition hover:text-[#2FA084] light:hover:text-sky-600"
                >
                  <BsLinkedin />
                </a>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <button
                className="btn-secondary w-full px-4 py-2 text-sm"
                onClick={() => {
                  onOpenDashboard()
                  closeSidebar()
                }}
              >
                Dashboard
              </button>
              <a href="#contact" onClick={closeSidebar} className="btn-primary w-full px-4 py-2 text-center text-sm">
                Hire Me
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
