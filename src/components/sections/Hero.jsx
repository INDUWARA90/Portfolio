import { FiArrowUpRight, FiDownload, FiMapPin, FiZap } from 'react-icons/fi'
import fallbackProfileImage from '../../assets/boy.png'

function Hero({ profile, socials, stats }) {
  const visibleStats = stats.slice(0, 3)

  return (
    <section id="home" className="relative px-4 pb-20 pt-32 md:px-8 lg:pt-36">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="hero-panel rounded-md p-6 md:p-8 lg:p-10">
          <p className="inline-flex rounded-md border border-[#2FA084]/20 bg-[#6FCF97]/18 px-4 py-2 text-sm font-bold text-[#1F6F5F] light:border-sky-200 light:bg-sky-50 light:text-sky-700">
            Available for internships and freelance projects
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[1.02] text-[#1F6F5F] light:text-slate-950 md:text-7xl">
            {profile.name}
            <span className="block text-[#2FA084] light:text-sky-700">{profile.role}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#1F6F5F]/78 light:text-slate-700">{profile.intro}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {profile.location && (
              <span className="soft-chip px-4 py-2 text-sm font-semibold">
                <FiMapPin />
                {profile.location}
              </span>
            )}
            <span className="soft-chip px-4 py-2 text-sm font-semibold">
              <FiZap />
              React / .NET
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {profile.resumeUrl && (
              <a href={profile.resumeUrl} download="CV.pdf" className="btn-primary gap-2 px-5 py-3 text-sm">
                <FiDownload />
                Download CV
              </a>
            )}
            <a href="#projects" className="btn-secondary gap-2 px-5 py-3 text-sm">
              View Work
              <FiArrowUpRight />
            </a>
            {socials.slice(0, 2).map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="btn-secondary px-5 py-3 text-sm">
                {social.label}
              </a>
            ))}
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {visibleStats.map((stat) => (
              <div key={stat.label} className="premium-card rounded-md p-5">
                <div className="text-3xl font-black text-[#1F6F5F] light:text-slate-950">{stat.value}</div>
                <div className="mt-1 text-sm text-[#1F6F5F]/65 light:text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {profile.image && (
          <div className="relative mx-auto w-full max-w-md">
            <div className="profile-frame">
              <img
                src={profile.image}
                alt={profile.name || 'Profile'}
                className="aspect-[4/5] w-full rounded-md object-cover"
                onError={(event) => {
                  event.currentTarget.src = fallbackProfileImage
                }}
              />
              <div className="absolute -bottom-5 left-5 right-5 rounded-md border border-[#2FA084]/20 bg-white/92 p-4 shadow-[0_18px_38px_rgba(31,111,95,0.16)] backdrop-blur">
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
