import { FaCss3Alt, FaHtml5, FaNodeJs, FaReact } from 'react-icons/fa'
import { SiAngular, SiDotnet, SiFirebase, SiJavascript, SiMongodb, SiNextdotjs, SiPostman, SiTailwindcss } from 'react-icons/si'

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
  'Tailwind CSS': SiTailwindcss,
  Firebase: SiFirebase,
  'Node.js': FaNodeJs,
  MongoDB: SiMongodb,
  Postman: SiPostman,
  '.NET': SiDotnet,
  DotNet: SiDotnet,
  'Next.js': SiNextdotjs,
  'Next JS': SiNextdotjs,
  NextJS: SiNextdotjs,
  Angular: SiAngular,
  HTML: FaHtml5,
  CSS: FaCss3Alt,
}

function TechMarquee({ skills }) {
  const stack = skills.length
    ? skills.slice(0, 10).map((skill) => ({ name: skill.name, Icon: iconMap[skill.name] }))
    : fallbackStack
  const repeatedStack = [...stack, ...stack]

  return (
    <section aria-label="Technology stack" className="relative z-10 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-md border border-[#1F6F5F]/10 bg-white/72 py-4 shadow-[0_20px_50px_rgba(31,111,95,0.08)] backdrop-blur">
        <div className="tech-marquee-track flex w-max items-center gap-3">
          {repeatedStack.map(({ name, Icon }, index) => (
            <div key={`${name}-${index}`} className="soft-chip px-4 py-3 text-sm font-black">
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
