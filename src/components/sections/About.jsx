import { FiCheckCircle } from 'react-icons/fi'
import SectionHeader from '../ui/SectionHeader'

function About({ profile, services }) {
  
  return (
    <section id="about" className="section-band px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="About" title="A developer story with product thinking" description={profile.objective} />
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="premium-card rounded-md p-6 text-[#1F6F5F]/78 light:text-slate-700 md:p-8">
            <h3 className="text-2xl font-semibold text-[#1F6F5F] light:text-slate-950">Personal Story</h3>
            <p className="mt-4 leading-8">{profile.story}</p>
            <div className="mt-8">
              <h4 className="font-semibold text-[#2FA084] light:text-sky-700">Technical interests</h4>
              <div className="mt-4 flex flex-wrap gap-3">
                {profile.interests.map((interest) => (
                  <span key={interest} className="rounded-md border border-[#2FA084]/12 bg-white/70 px-4 py-2 text-sm text-[#1F6F5F] light:bg-slate-100 light:text-slate-700">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-md border border-[#2FA084]/24 bg-gradient-to-br from-[#6FCF97]/65 via-white to-[#EEEEEE] p-6 text-[#1F6F5F] shadow-[0_24px_64px_rgba(47,160,132,0.18)] light:border-sky-200 light:from-teal-50 light:via-sky-50 light:to-white md:p-8">
            <h3 className="text-2xl font-bold">What I Can Help With</h3>
            <ul className="mt-5 space-y-4">
              {services.map((service) => (
                <li key={service} className="flex items-start gap-3 rounded-md bg-white/62 p-4 font-semibold shadow-sm transition hover:bg-white/86">
                  <FiCheckCircle className="mt-1 shrink-0 text-[#2FA084]" />
                  <span>{service}</span>
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
