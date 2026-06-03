import { FiArrowUpRight, FiDownload } from 'react-icons/fi'

function Hero({ profile, socials, stats }) {
  const visibleStats = stats.slice(0, 3)

  return (
    <section id="home" className="relative px-4 pb-20 pt-32 md:px-8 lg:pt-36">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="inline-flex rounded-md border border-teal-300/30 bg-teal-300/10 px-4 py-2 text-sm font-bold text-teal-200 light:border-sky-200 light:bg-sky-50 light:text-sky-700">
            Available for internships and freelance projects
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[1.02] text-white light:text-slate-950 md:text-7xl">
            {profile.name}
            <span className="block text-teal-300 light:text-sky-700">{profile.role}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 light:text-slate-700">{profile.intro}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={profile.resumeUrl} download className="btn-primary gap-2 px-5 py-3 text-sm">
              <FiDownload />
              Download CV
            </a>
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
                <div className="text-3xl font-black text-white light:text-slate-950">{stat.value}</div>
                <div className="mt-1 text-sm text-slate-400 light:text-slate-600">{stat.label}</div>
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
                  event.currentTarget.closest('.profile-frame')?.classList.add('hidden')
                }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Hero
