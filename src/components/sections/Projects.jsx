import { FiArrowUpRight, FiGithub } from 'react-icons/fi'
import fallbackProjectImage from '../../assets/P01.png'
import SectionHeader from '../ui/SectionHeader'

function Projects({ projects }) {
  return (
    <section id="projects" className="section-band px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Projects" title="Selected work with live links" description="A small set of projects that show interface thinking, responsiveness, and practical JavaScript/React skills." />

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <article key={project.id} className="premium-card overflow-hidden rounded-md">
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                className="h-56 w-full object-cover"
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.src = fallbackProjectImage
                }}
              />
              <div className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-teal-300 light:text-sky-700">{project.category}</p>
                    <h3 className="mt-1 text-2xl font-black text-white light:text-slate-950">{project.title}</h3>
                  </div>
                  <span className="rounded-md bg-emerald-300 px-3 py-1 text-xs font-black text-emerald-950 light:bg-sky-100 light:text-sky-800">{project.status}</span>
                </div>

                <p className="mt-4 leading-7 text-slate-300 light:text-slate-700">{project.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.techstack.map((item) => (
                    <span key={item} className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 light:border-slate-200 light:bg-slate-50 light:text-slate-700">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {project.dlink && (
                    <a href={project.dlink} target="_blank" rel="noreferrer" className="btn-primary gap-2 px-4 py-2 text-sm">
                      Live Demo
                      <FiArrowUpRight />
                    </a>
                  )}
                  {project.clink && (
                    <a href={project.clink} target="_blank" rel="noreferrer" className="btn-secondary gap-2 px-4 py-2 text-sm">
                      <FiGithub />
                      Code
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
