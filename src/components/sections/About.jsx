import SectionHeader from '../ui/SectionHeader'

function About({ profile, services }) {
  
  return (
    <section id="about" className="section-band px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="About" title="A developer story with product thinking" description={profile.objective} />
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="premium-card rounded-md p-6 text-slate-300 light:text-slate-700 md:p-8">
            <h3 className="text-2xl font-semibold text-white light:text-slate-950">Personal Story</h3>
            <p className="mt-4 leading-8">{profile.story}</p>
            <div className="mt-8">
              <h4 className="font-semibold text-teal-300 light:text-sky-700">Technical interests</h4>
              <div className="mt-4 flex flex-wrap gap-3">
                {profile.interests.map((interest) => (
                  <span key={interest} className="rounded-md bg-white/10 px-4 py-2 text-sm text-slate-200 light:bg-slate-100 light:text-slate-700">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-md border border-teal-200/40 bg-gradient-to-br from-teal-200 via-lime-200 to-white p-6 text-slate-950 shadow-[0_24px_80px_rgba(45,212,191,0.2)] light:border-sky-200 light:from-teal-50 light:via-sky-50 light:to-white md:p-8">
            <h3 className="text-2xl font-bold">What I Can Help With</h3>
            <ul className="mt-5 space-y-4">
              {services.map((service) => (
                <li key={service} className="rounded-md bg-slate-950/10 p-4 font-semibold shadow-sm transition hover:bg-slate-950/15">
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
