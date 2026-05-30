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
                <p className="text-sm font-semibold text-teal-300 light:text-sky-700">{item.period} / {item.type}</p>
                <h3 className="mt-2 text-2xl font-semibold text-white light:text-slate-950">{item.title}</h3>
                <p className="mt-1 text-slate-400 light:text-slate-600">{item.company}</p>
                <p className="mt-4 leading-7 text-slate-300 light:text-slate-700">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.technologies.map((tech) => <span key={tech} className="rounded-md bg-white/10 px-3 py-2 text-xs text-slate-200 light:bg-slate-100 light:text-slate-700">{tech}</span>)}
                </div>
              </article>
            ))}
          </div>
          <div className="space-y-5">
            {education.map((item) => (
              <article key={item.institution} className="premium-card rounded-md p-6">
                <p className="text-sm font-semibold text-teal-300 light:text-sky-700">{item.period}</p>
                <h3 className="mt-2 text-2xl font-semibold text-white light:text-slate-950">{item.institution}</h3>
                <p className="mt-1 text-slate-300 light:text-slate-700">{item.degree}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.coursework.map((course) => <span key={course} className="rounded-md bg-white/10 px-3 py-2 text-xs text-slate-200 light:bg-slate-100 light:text-slate-700">{course}</span>)}
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
