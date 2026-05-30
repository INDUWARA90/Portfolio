import { useState } from 'react'
import { FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi'
import SectionHeader from '../ui/SectionHeader'

function Contact({ profile }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function sendMessage(event) {
    event.preventDefault()

    const subject = encodeURIComponent(form.subject || 'Portfolio inquiry')
    const body = encodeURIComponent(
      `Hi Induwara,\n\n${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`,
    )

    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="section-band px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Contact Me"
          title="Have a project or opportunity?"
          description="Tell me what you want to build, share an internship opportunity, or send feedback about my work."
        />

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="rounded-md border border-teal-200/40 bg-gradient-to-br from-teal-200 via-lime-200 to-white p-6 text-slate-950 shadow-[0_24px_80px_rgba(45,212,191,0.2)] light:border-sky-200 light:from-teal-50 light:via-sky-50 light:to-white md:p-8">
            <h3 className="text-2xl font-black">Direct Contact</h3>
            <p className="mt-3 leading-7">
              I usually reply fastest through email. You can also use the form and it will prepare an email for you.
            </p>

            <div className="mt-7 space-y-4 text-sm font-bold">
              <a className="flex items-center gap-3 rounded-md bg-white/55 p-4 transition hover:bg-white/80" href={`mailto:${profile.email}`}>
                <FiMail />
                {profile.email}
              </a>
              <a className="flex items-center gap-3 rounded-md bg-white/55 p-4 transition hover:bg-white/80" href={`tel:${profile.phone.replaceAll(' ', '')}`}>
                <FiPhone />
                {profile.phone}
              </a>
              <p className="flex items-center gap-3 rounded-md bg-white/55 p-4">
                <FiMapPin />
                {profile.location}
              </p>
            </div>
          </aside>

          <form onSubmit={sendMessage} className="premium-card rounded-md p-6 md:p-8">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-bold text-slate-300 light:text-slate-900">
                Name
                <input
                  required
                  value={form.name}
                  onChange={(event) => updateField('name', event.target.value)}
                  className="mt-2 w-full rounded-md border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-teal-300 light:border-slate-300 light:bg-white light:text-black"
                  placeholder="Your name"
                />
              </label>
              <label className="text-sm font-bold text-slate-300 light:text-slate-900">
                Email
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  className="mt-2 w-full rounded-md border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-teal-300 light:border-slate-300 light:bg-white light:text-black"
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <label className="mt-4 block text-sm font-bold text-slate-300 light:text-slate-900">
              Subject
              <input
                required
                value={form.subject}
                onChange={(event) => updateField('subject', event.target.value)}
                className="mt-2 w-full rounded-md border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-teal-300 light:border-slate-300 light:bg-white light:text-black"
                placeholder="Website project, internship, feedback..."
              />
            </label>

            <label className="mt-4 block text-sm font-bold text-slate-300 light:text-slate-900">
              Message
              <textarea
                required
                rows="6"
                value={form.message}
                onChange={(event) => updateField('message', event.target.value)}
                className="mt-2 w-full resize-none rounded-md border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-teal-300 light:border-slate-300 light:bg-white light:text-black"
                placeholder="Write your message here..."
              />
            </label>

            <button className="btn-primary mt-5 gap-2 px-5 py-3 text-sm">
              <FiSend />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
