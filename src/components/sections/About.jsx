import { FiCheckCircle } from 'react-icons/fi'
import EmptyState from '../ui/EmptyState'
import SectionHeader from '../ui/SectionHeader'

function About({ profile, services }) {
  const interests = Array.isArray(profile.interests) ? profile.interests.filter(Boolean) : []
  const serviceItems = Array.isArray(services) ? services.filter(Boolean) : []
  const objective = profile.objective || 'A portfolio section ready for your personal objective.'
  const story = profile.story || ''
  
  return (
    <section id="about" className="section-band px-4 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="About" title="A developer story with product thinking" description={objective} />
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="premium-card rounded-md p-5 text-[#1F6F5F]/78 light:text-slate-700 md:p-8">
            <h3 className="text-xl font-semibold text-[#1F6F5F] light:text-slate-950 sm:text-2xl">Personal Story</h3>
            {story ? (
              <p className="mt-4 leading-8">{story}</p>
            ) : (
              <EmptyState title="Story coming soon" message="More background and personal context will be shared here soon." />
            )}
            <div className="mt-8">
              <h4 className="font-semibold text-[#2FA084] light:text-sky-700">Technical interests</h4>
              {interests.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-3">
                  {interests.map((interest) => (
                    <span key={interest} className="rounded-md border border-[#2FA084]/12 bg-white/70 px-4 py-2 text-sm text-[#1F6F5F] light:bg-slate-100 light:text-slate-700">
                      {interest}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="mt-4">
                  <EmptyState title="Interests coming soon" message="Technical interests and focus areas will be shared here soon." />
                </div>
              )}
            </div>
          </div>
          <div className="rounded-md border border-[#2FA084]/24 bg-gradient-to-br from-[#6FCF97]/65 via-white to-[#EEEEEE] p-5 text-[#1F6F5F] shadow-[0_24px_64px_rgba(47,160,132,0.18)] light:border-sky-200 light:from-teal-50 light:via-sky-50 light:to-white md:p-8">
            <h3 className="text-xl font-bold sm:text-2xl">What I Can Help With</h3>
            {serviceItems.length > 0 ? (
              <ul className="mt-5 space-y-4">
                {serviceItems.map((service) => (
                  <li key={service} className="flex items-start gap-3 rounded-md bg-white/62 p-4 font-semibold shadow-sm transition hover:bg-white/86">
                    <FiCheckCircle className="mt-1 shrink-0 text-[#2FA084]" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-5">
                <EmptyState title="Services coming soon" message="Ways to collaborate and areas of support will be shared here soon." />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
