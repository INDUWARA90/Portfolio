import { useMemo, useState } from 'react'

function Chatbot({ content }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Ask me about skills, projects, experience, or contact details.' },
  ])
  const [input, setInput] = useState('')

  const knowledge = useMemo(() => ({
    skills: content.skills.map((skill) => skill.name).join(', '),
    projects: content.projects.map((project) => `${project.title}: ${project.description}`).join(' '),
    experience: content.experience.map((item) => `${item.title} at ${item.company}`).join(', '),
    contact: `${content.profile.email}, ${content.profile.location}`,
    about: `${content.profile.story} ${content.profile.objective}`,
  }), [content])

  function answerQuestion(question) {
    const lower = question.toLowerCase()
    if (lower.includes('skill') || lower.includes('technology')) return knowledge.skills ? `Skills include ${knowledge.skills}.` : 'Skills will be added soon.'
    if (lower.includes('project') || lower.includes('best')) return `Highlighted projects include ${knowledge.projects}`
    if (lower.includes('experience')) return `Experience includes ${knowledge.experience}.`
    if (lower.includes('contact') || lower.includes('email')) return knowledge.contact.trim() ? `Contact details: ${knowledge.contact}.` : 'Contact details will be added soon.'
    return knowledge.about.trim() || 'Portfolio details will be added soon.'
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!input.trim()) return
    const question = input.trim()
    setMessages((items) => [...items, { from: 'user', text: question }, { from: 'bot', text: answerQuestion(question) }])
    setInput('')
  }

  return (
    <>
      <button onClick={() => setOpen((value) => !value)} className="fixed bottom-5 right-5 z-40 rounded-md bg-[#2FA084] px-4 py-3 text-sm font-bold text-white shadow-xl">
        AI Chat
      </button>
      {open && (
        <div className="fixed bottom-20 right-5 z-40 flex h-[460px] w-[min(92vw,360px)] flex-col rounded-md border border-[#1F6F5F]/12 bg-white shadow-2xl light:bg-white">
          <div className="border-b border-[#1F6F5F]/10 p-4">
            <h3 className="font-semibold text-[#1F6F5F] light:text-slate-950">Portfolio Assistant</h3>
          </div>
          <div className="flex-1 space-y-3 overflow-auto p-4">
            {messages.map((message, index) => (
              <div key={`${message.from}-${index}`} className={`rounded-md p-3 text-sm ${message.from === 'bot' ? 'bg-[#EEEEEE] text-[#1F6F5F] light:bg-slate-100 light:text-slate-700' : 'bg-[#6FCF97] text-[#1F6F5F]'}`}>
                {message.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-[#1F6F5F]/10 p-3">
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask a question..." className="min-w-0 flex-1 rounded-md bg-[#EEEEEE] px-3 py-2 text-sm text-[#1F6F5F] outline-none focus:ring-2 focus:ring-[#6FCF97] light:bg-slate-100 light:text-slate-950" />
            <button className="rounded-md bg-[#2FA084] px-3 py-2 text-sm font-bold text-white">Send</button>
          </form>
        </div>
      )}
    </>
  )
}

export default Chatbot
