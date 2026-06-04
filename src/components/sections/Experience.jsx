import { FiBookOpen, FiBriefcase, FiCheckCircle } from 'react-icons/fi'
import EmptyState from '../ui/EmptyState'
import SectionHeader from '../ui/SectionHeader'

function Experience({ experience, education }) {
  const experienceItems = Array.isArray(experience) ? experience : []
  const educationItems = Array.isArray(education) ? education : []
  const timelineItems = [
    ...experienceItems.map((item) => ({ ...item, kind: 'Experience' })),
    ...educationItems.map((item) => ({
      title: item.institution,
      company: item.degree,
      description: item.coursework?.join(', '),
      period: item.period,
      technologies: item.coursework || [],
      kind: 'Education',
    })),
  ]

  return (
    <section id="experience" className="section-band px-4 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Experience" title="Learning by building and shipping" description="A practical timeline of projects, freelance work, education, and responsibilities." />

        <div className="mx-auto max-w-4xl">
          {timelineItems.length > 0 ? (
            <div className="relative space-y-5 pl-3 before:absolute before:bottom-3 before:left-2 before:top-3 before:w-px before:bg-[#2FA084]/22 sm:pl-5 sm:before:left-[0.85rem]">
              {timelineItems.map((item, index) => {
              const Icon = item.kind === 'Education' ? FiBookOpen : FiBriefcase

              return (
                <article key={`${item.kind}-${item.title}-${index}`} className="relative">
                  <span className="absolute -left-[1.05rem] top-5 grid h-7 w-7 place-items-center rounded-md bg-[#2FA084] text-sm text-white shadow-[0_0_0_4px_rgba(111,207,151,0.2)] sm:-left-[1.58rem] sm:top-6 sm:h-9 sm:w-9 sm:text-base sm:shadow-[0_0_0_6px_rgba(111,207,151,0.2)]">
                    <Icon />
                  </span>
                  <div className="premium-card rounded-md p-5 sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="rounded-md bg-[#6FCF97]/28 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#2FA084]">{item.kind}</p>
                      <p className="text-sm font-semibold text-[#2FA084] light:text-sky-700">{item.period}{item.type ? ` / ${item.type}` : ''}</p>
                    </div>
                    <h3 className="mt-4 break-words text-xl font-black text-[#1F6F5F] light:text-slate-950 sm:text-2xl">{item.title}</h3>
                    {item.company && <p className="mt-1 font-semibold text-[#1F6F5F]/64 light:text-slate-600">{item.company}</p>}
                    {item.description && <p className="mt-4 leading-7 text-[#1F6F5F]/76 light:text-slate-700">{item.description}</p>}
                    {item.technologies?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.technologies.map((tech) => (
                          <span key={tech} className="inline-flex items-center gap-2 rounded-md border border-[#2FA084]/12 bg-white/68 px-3 py-2 text-xs text-[#1F6F5F] light:bg-slate-100 light:text-slate-700">
                            <FiCheckCircle className="text-[#2FA084]" />
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              )
              })}
            </div>
          ) : (
            <EmptyState title="Timeline coming soon" message="Experience, education, and project milestones will be shared here soon." />
          )}
        </div>
      </div>
    </section>
  )
}

export default Experience
