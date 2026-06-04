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

const fallbackStack = [
  { name: 'React', Icon: FaReact },
  { name: 'JavaScript', Icon: SiJavascript },
  { name: 'Tailwind CSS', Icon: SiTailwindcss },
  { name: 'Firebase', Icon: SiFirebase },
  { name: 'Node.js', Icon: FaNodeJs },
  { name: 'MongoDB', Icon: SiMongodb },
  { name: 'Postman', Icon: SiPostman },
  { name: '.NET', Icon: SiDotnet },
  { name: 'Next.js', Icon: SiNextdotjs },
  { name: 'Angular', Icon: SiAngular },
  { name: 'HTML', Icon: FaHtml5 },
  { name: 'CSS', Icon: FaCss3Alt },
]

const iconMap = {
  React: FaReact,
  JavaScript: SiJavascript,
  Javascript: SiJavascript,
  JS: SiJavascript,
  'Tailwind CSS': SiTailwindcss,
  Tailwind: SiTailwindcss,
  TailwindCSS: SiTailwindcss,
  Firebase: SiFirebase,
  Firestore: SiFirebase,
  'Node.js': FaNodeJs,
  'Node JS': FaNodeJs,
  NodeJS: FaNodeJs,
  nodejs: FaNodeJs,
  Express: SiExpress,
  'Express.js': SiExpress,
  MongoDB: SiMongodb,
  Mongodb: SiMongodb,
  MySQL: SiMysql,
  Mysql: SiMysql,
  SQL: SiMysql,
  Git: FaGitAlt,
  GitHub: FaGithub,
  Github: FaGithub,
  Postman: SiPostman,
  '.NET': SiDotnet,
  DotNet: SiDotnet,
  'ASP.NET': SiDotnet,
  'ASP.NET Core': SiDotnet,
  'Next.js': SiNextdotjs,
  'Next JS': SiNextdotjs,
  NextJS: SiNextdotjs,
  Nextjs: SiNextdotjs,
  nextjs: SiNextdotjs,
  Angular: SiAngular,
  HTML: FaHtml5,
  CSS: FaCss3Alt,
}

const normalizedIconMap = Object.fromEntries(
  Object.entries(iconMap).map(([name, Icon]) => [normalizeSkillName(name), Icon]),
)

const requiredStack = [
  { name: 'Postman' },
  { name: '.NET' },
  { name: 'Next.js' },
  { name: 'Angular' },
]

function normalizeSkillName(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/[^a-z0-9+#.]/g, '')
}

function getSkillIcon(name) {
  return iconMap[name] || normalizedIconMap[normalizeSkillName(name)]
}

function TechMarquee({ skills }) {
  const filteredSkills = skills.filter((skill) => skill.name !== 'VS Code')
  const skillNames = new Set(filteredSkills.map((skill) => normalizeSkillName(skill.name)))
  const visibleSkills = [
    ...filteredSkills,
    ...requiredStack.filter((skill) => !skillNames.has(normalizeSkillName(skill.name))),
  ]
  const stack = visibleSkills.length
    ? visibleSkills.slice(0, 14).map((skill) => ({ name: skill.name, Icon: getSkillIcon(skill.name) }))
    : fallbackStack
  const repeatedStack = [...stack, ...stack]

  return (
    <section aria-label="Technology stack" className="relative z-10 px-3 py-6 sm:px-4 sm:py-8 md:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-md border border-[#1F6F5F]/10 bg-white/72 py-3 shadow-[0_20px_50px_rgba(31,111,95,0.08)] backdrop-blur sm:py-4">
        <div className="tech-marquee-track flex w-max items-center gap-2 sm:gap-3">
          {repeatedStack.map(({ name, Icon }, index) => (
            <div key={`${name}-${index}`} className="soft-chip px-3 py-2.5 text-xs font-black sm:px-4 sm:py-3 sm:text-sm">
              {Icon ? <Icon className="text-lg text-[#2FA084]" /> : <span className="text-[#2FA084]">#</span>}
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechMarquee
