import SectionHeader from '../ui/SectionHeader'

function Experience({ experience, education }) {
  return (
    <section id="experience" className="section-band px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Experience" title="Learning by building and shipping" description="A practical timeline of projects, freelance work, education, and responsibilities." />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-5">
            {experience.map((item) => (
              <article key={item.title} className="premium-card rounded-md p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-[#2FA084] shadow-[0_0_0_6px_rgba(111,207,151,0.2)]" />
                  <p className="text-sm font-semibold text-[#2FA084] light:text-sky-700">{item.period} / {item.type}</p>
                </div>
                <h3 className="mt-2 text-2xl font-semibold text-[#1F6F5F] light:text-slate-950">{item.title}</h3>
                <p className="mt-1 text-[#1F6F5F]/62 light:text-slate-600">{item.company}</p>
                <p className="mt-4 leading-7 text-[#1F6F5F]/76 light:text-slate-700">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.technologies.map((tech) => <span key={tech} className="rounded-md border border-[#2FA084]/12 bg-white/68 px-3 py-2 text-xs text-[#1F6F5F] light:bg-slate-100 light:text-slate-700">{tech}</span>)}
                </div>
              </article>
            ))}
          </div>
          <div className="space-y-5">
            {education.map((item) => (
              <article key={item.institution} className="premium-card rounded-md p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-[#6FCF97] shadow-[0_0_0_6px_rgba(47,160,132,0.14)]" />
                  <p className="text-sm font-semibold text-[#2FA084] light:text-sky-700">{item.period}</p>
                </div>
                <h3 className="mt-2 text-2xl font-semibold text-[#1F6F5F] light:text-slate-950">{item.institution}</h3>
                <p className="mt-1 text-[#1F6F5F]/76 light:text-slate-700">{item.degree}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.coursework.map((course) => <span key={course} className="rounded-md border border-[#2FA084]/12 bg-white/68 px-3 py-2 text-xs text-[#1F6F5F] light:bg-slate-100 light:text-slate-700">{course}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
