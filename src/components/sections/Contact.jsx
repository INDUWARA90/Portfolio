import { useState } from 'react'
import { FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi'
import { getEmailAddress, getMailtoLink } from '../../lib/contactLinks'
import { sendContactMessage } from '../../lib/messages'
import EmptyState from '../ui/EmptyState'
import SectionHeader from '../ui/SectionHeader'

function Contact({ profile }) {
  const email = getEmailAddress(profile.email)
  const mailtoLink = getMailtoLink(email, 'Portfolio inquiry')
  const hasDirectContact = Boolean(email || profile.phone || profile.location)
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function sendMessage(event) {
    event.preventDefault()
    setIsSending(true)
    setStatus('')
    setError('')

    try {
      await sendContactMessage(form)
      setForm({ name: '', email: '', subject: '', message: '' })
      setStatus('Message sent successfully.')
    } catch (sendError) {
      setError(sendError.message)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section id="contact" className="section-band px-4 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Contact Me"
          title="Have a project or opportunity?"
          description="Tell me what you want to build, share an internship opportunity, or send feedback about my work."
        />

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="rounded-md border border-[#2FA084]/24 bg-gradient-to-br from-[#6FCF97]/65 via-white to-[#EEEEEE] p-5 text-[#1F6F5F] shadow-[0_24px_64px_rgba(47,160,132,0.18)] light:border-sky-200 light:from-teal-50 light:via-sky-50 light:to-white md:p-8">
            <h3 className="text-xl font-black sm:text-2xl">Direct Contact</h3>
            <p className="mt-3 leading-7">
              I usually reply fastest through email. You can also use the form and it will prepare an email for you.
            </p>

            {hasDirectContact ? (
              <div className="mt-7 space-y-4 text-sm font-bold">
                {email && (
                  <a className="flex min-w-0 items-center gap-3 rounded-md bg-white/62 p-3 transition hover:bg-white/86 sm:p-4" href={mailtoLink}>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-[#2FA084] text-white">
                      <FiMail />
                    </span>
                  <span className="min-w-0 break-all">{email}</span>
                  </a>
                )}
                {profile.phone && (
                  <a className="flex min-w-0 items-center gap-3 rounded-md bg-white/62 p-3 transition hover:bg-white/86 sm:p-4" href={`tel:${profile.phone.replaceAll(' ', '')}`}>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-[#2FA084] text-white">
                      <FiPhone />
                    </span>
                  <span className="min-w-0 break-all">{profile.phone}</span>
                  </a>
                )}
                {profile.location && (
                <p className="flex min-w-0 items-center gap-3 rounded-md bg-white/62 p-3 sm:p-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-[#2FA084] text-white">
                      <FiMapPin />
                    </span>
                  <span className="min-w-0 break-words">{profile.location}</span>
                  </p>
                )}
              </div>
            ) : (
              <div className="mt-7">
                <EmptyState title="Direct contact coming soon" message="Use the contact form for now, and direct contact details will be shared here soon." />
              </div>
            )}
          </aside>

          <form onSubmit={sendMessage} className="premium-card rounded-md p-5 md:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#2FA084]">Message</p>
                <h3 className="mt-1 text-xl font-black text-[#1F6F5F] sm:text-2xl">Start a conversation</h3>
              </div>
              <span className="hidden h-12 w-12 place-items-center rounded-md bg-[#6FCF97] text-xl text-[#1F6F5F] md:grid">
                <FiSend />
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-bold text-[#1F6F5F] light:text-slate-900">
                Name
                <input
                  required
                  value={form.name}
                  onChange={(event) => updateField('name', event.target.value)}
                  className="mt-2 w-full rounded-md border border-[#1F6F5F]/14 bg-white/78 px-4 py-3 text-[#1F6F5F] outline-none focus:border-[#2FA084] light:border-slate-300 light:bg-white light:text-black"
                  placeholder="Your name"
                />
              </label>
              <label className="text-sm font-bold text-[#1F6F5F] light:text-slate-900">
                Email
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  className="mt-2 w-full rounded-md border border-[#1F6F5F]/14 bg-white/78 px-4 py-3 text-[#1F6F5F] outline-none focus:border-[#2FA084] light:border-slate-300 light:bg-white light:text-black"
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <label className="mt-4 block text-sm font-bold text-[#1F6F5F] light:text-slate-900">
              Subject
              <input
                required
                value={form.subject}
                onChange={(event) => updateField('subject', event.target.value)}
                className="mt-2 w-full rounded-md border border-[#1F6F5F]/14 bg-white/78 px-4 py-3 text-[#1F6F5F] outline-none focus:border-[#2FA084] light:border-slate-300 light:bg-white light:text-black"
                placeholder="Website project, internship, feedback..."
              />
            </label>

            <label className="mt-4 block text-sm font-bold text-[#1F6F5F] light:text-slate-900">
              Message
              <textarea
                required
                rows="6"
                value={form.message}
                onChange={(event) => updateField('message', event.target.value)}
                className="mt-2 w-full resize-none rounded-md border border-[#1F6F5F]/14 bg-white/78 px-4 py-3 text-[#1F6F5F] outline-none focus:border-[#2FA084] light:border-slate-300 light:bg-white light:text-black"
                placeholder="Write your message here..."
              />
            </label>

            {status && <p className="mt-4 text-sm font-bold text-[#2FA084] light:text-sky-700">{status}</p>}
            {error && <p className="mt-4 text-sm font-bold text-red-300 light:text-red-700">{error}</p>}

            <button disabled={isSending} className="btn-primary mt-5 w-full gap-2 px-5 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
              <FiSend />
              {isSending ? 'Sending' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
