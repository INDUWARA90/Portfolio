import { FaCss3Alt, FaGitAlt, FaGithub, FaHtml5, FaNodeJs, FaReact } from 'react-icons/fa'
import {
  SiAngular,
  SiDotnet,
  SiExpress,
  SiFirebase,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiPostman,
  SiTailwindcss,
} from 'react-icons/si'
import SectionHeader from '../ui/SectionHeader'

const skillIcons = {
  React: FaReact,
  JavaScript: SiJavascript,
  HTML: FaHtml5,
  CSS: FaCss3Alt,
  'Tailwind CSS': SiTailwindcss,
  Firebase: SiFirebase,
  'Node.js': FaNodeJs,
  Express: SiExpress,
  Firestore: SiFirebase,
  MongoDB: SiMongodb,
  MySQL: SiMysql,
  Git: FaGitAlt,
  GitHub: FaGithub,
  Postman: SiPostman,
  '.NET': SiDotnet,
  DotNet: SiDotnet,
  'Next.js': SiNextdotjs,
  'Next JS': SiNextdotjs,
  NextJS: SiNextdotjs,
  Nextjs: SiNextdotjs,
  nextjs: SiNextdotjs,
  Angular: SiAngular,
}

const requiredSkills = [
  { name: 'Postman', category: 'API Testing' },
  { name: '.NET', category: 'Backend' },
  { name: 'Next.js', category: 'Frontend Framework' },
  { name: 'Angular', category: 'Frontend Framework' },
]

function Skills({ skills }) {
  const filteredSkills = skills.filter((skill) => skill.name !== 'VS Code')
  const skillNames = new Set(filteredSkills.map((skill) => skill.name))
  const visibleSkills = [
    ...filteredSkills,
    ...requiredSkills.filter((skill) => !skillNames.has(skill.name)),
  ]
  const topSkills = visibleSkills.slice(0, 16)

  return (
    <section id="skills" className="section-band px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Skills" title="A focused stack for practical web apps" description="Frontend polish, backend basics, database thinking, and the tools needed to ship." />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topSkills.map((skill) => {
            const Icon = skillIcons[skill.name]

            return (
              <div key={skill.name} className="premium-card group rounded-md p-5">
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-[#6FCF97] text-2xl text-[#1F6F5F] shadow-[0_12px_24px_rgba(47,160,132,0.18)] transition group-hover:bg-[#2FA084] group-hover:text-white light:bg-sky-100 light:text-sky-700">
                    {Icon ? <Icon /> : <span className="text-sm font-black">{skill.name.slice(0, 2)}</span>}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1F6F5F] light:text-slate-950">{skill.name}</h3>
                    <p className="text-sm text-[#1F6F5F]/62 light:text-slate-600">{skill.category}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills
