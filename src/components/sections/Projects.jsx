import { FiArrowUpRight, FiGithub } from 'react-icons/fi'
import fallbackProjectImage from '../../assets/P01.png'
import SectionHeader from '../ui/SectionHeader'

function Projects({ projects }) {
  function renderProjectActions(project, className = '') {
    return (
      <div className={`flex flex-wrap gap-3 ${className}`}>
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
    )
  }

  return (
    <section id="projects" className="section-band px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Projects" title="Selected work with live links" description="A small set of projects that show interface thinking, responsiveness, and practical JavaScript/React skills." />

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <article key={project.id} className="premium-card overflow-hidden rounded-md">
              {project.image && (
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="h-60 w-full object-cover transition duration-500 hover:scale-105"
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.src = fallbackProjectImage
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1F6F5F]/55 to-transparent" />
                </div>
              )}
              <div className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-[#2FA084] light:text-sky-700">{project.category}</p>
                    <h3 className="mt-1 text-2xl font-black text-[#1F6F5F] light:text-slate-950">{project.title}</h3>
                  </div>
                  <span className="rounded-md bg-[#6FCF97] px-3 py-1 text-xs font-black text-[#1F6F5F] light:bg-sky-100 light:text-sky-800">{project.status}</span>
                </div>

                <p className="mt-4 leading-7 text-[#1F6F5F]/76 light:text-slate-700">{project.description}</p>

                {project.techstack?.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.techstack.map((item) => (
                      <span key={item} className="rounded-md border border-[#2FA084]/12 bg-white/68 px-3 py-2 text-xs font-semibold text-[#1F6F5F] light:border-slate-200 light:bg-slate-50 light:text-slate-700">
                        {item}
                      </span>
                    ))}
                  </div>
                )}

                {renderProjectActions(project, 'mt-6')}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
