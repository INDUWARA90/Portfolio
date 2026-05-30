import { FaCss3Alt, FaGitAlt, FaGithub, FaHtml5, FaNodeJs, FaReact } from 'react-icons/fa'
import {
  SiExpress,
  SiFirebase,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiPostman,
  SiTailwindcss,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'
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
  'VS Code': VscVscode,
}

function Skills({ skills }) {
  const topSkills = skills.slice(0, 12)

  return (
    <section id="skills" className="section-band px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Skills" title="A focused stack for practical web apps" description="Frontend polish, backend basics, database thinking, and the tools needed to ship." />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topSkills.map((skill) => {
            const Icon = skillIcons[skill.name]

            return (
              <div key={skill.name} className="premium-card rounded-md p-5">
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-teal-300 text-2xl text-slate-950 light:bg-sky-100 light:text-sky-700">
                    {Icon ? <Icon /> : <span className="text-sm font-black">{skill.name.slice(0, 2)}</span>}
                  </div>
                  <div>
                    <h3 className="font-bold text-white light:text-slate-950">{skill.name}</h3>
                    <p className="text-sm text-slate-400 light:text-slate-600">{skill.category}</p>
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
