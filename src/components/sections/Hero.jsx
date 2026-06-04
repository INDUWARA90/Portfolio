import { FiArrowUpRight, FiDownload, FiMapPin, FiZap } from 'react-icons/fi'
import fallbackProfileImage from '../../assets/boy.png'

function Hero({ profile, socials, stats }) {
  const visibleStats = stats.slice(0, 3)

  return (
    <section id="home" className="relative px-3 pb-14 pt-24 sm:px-4 md:px-8 md:pb-20 md:pt-32 lg:pt-36">
      <div className="mx-auto grid max-w-7xl items-center gap-9 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
        <div className="hero-panel rounded-md p-4 sm:p-5 md:p-8 lg:p-10">
          <p className="inline-flex max-w-full rounded-md border border-[#2FA084]/20 bg-[#6FCF97]/18 px-3 py-2 text-xs font-bold text-[#1F6F5F] light:border-sky-200 light:bg-sky-50 light:text-sky-700 sm:px-4 sm:text-sm">
            Available for internships and freelance projects
          </p>
          <h1 className="mt-5 max-w-4xl break-words text-3xl font-black leading-tight text-[#1F6F5F] light:text-slate-950 min-[360px]:text-4xl sm:text-5xl md:mt-6 md:text-7xl md:leading-[1.02]">
            {profile.name}
            <span className="block text-[#2FA084] light:text-sky-700">{profile.role}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#1F6F5F]/78 light:text-slate-700 md:mt-6 md:text-lg md:leading-8">{profile.intro}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {profile.location && (
              <span className="soft-chip px-3 py-2 text-sm font-semibold sm:px-4">
                <FiMapPin />
                {profile.location}
              </span>
            )}
            <span className="soft-chip px-3 py-2 text-sm font-semibold sm:px-4">
              <FiZap />
              React / .NET
            </span>
          </div>

          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
            {profile.resumeUrl && (
              <a href={profile.resumeUrl} download="CV.pdf" className="btn-primary w-full gap-2 px-5 py-3 text-sm sm:w-auto">
                <FiDownload />
                Download CV
              </a>
            )}
            <a href="#projects" className="btn-secondary w-full gap-2 px-5 py-3 text-sm sm:w-auto">
              View Work
              <FiArrowUpRight />
            </a>
            {socials.slice(0, 2).map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="btn-secondary w-full px-5 py-3 text-sm sm:w-auto">
                {social.label}
              </a>
            ))}
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {visibleStats.map((stat) => (
              <div key={stat.label} className="premium-card rounded-md p-4 sm:p-5">
                <div className="text-3xl font-black text-[#1F6F5F] light:text-slate-950">{stat.value}</div>
                <div className="mt-1 text-sm text-[#1F6F5F]/65 light:text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {profile.image && (
          <div className="relative mx-auto w-full max-w-sm sm:max-w-md">
            <div className="profile-frame">
              <img
                src={profile.image}
                alt={profile.name || 'Profile'}
                className="aspect-[4/5] w-full rounded-md object-cover"
                onError={(event) => {
                  event.currentTarget.src = fallbackProfileImage
                }}
              />
              <div className="absolute -bottom-4 left-3 right-3 rounded-md border border-[#2FA084]/20 bg-white/92 p-3 shadow-[0_18px_38px_rgba(31,111,95,0.16)] backdrop-blur sm:-bottom-5 sm:left-5 sm:right-5 sm:p-4">
                <p className="text-sm font-black text-[#1F6F5F]">Building clean, responsive web experiences</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Hero
