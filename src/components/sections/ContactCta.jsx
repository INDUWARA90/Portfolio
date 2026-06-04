import { FiArrowRight, FiMail } from 'react-icons/fi'
import { getEmailAddress, getMailtoLink } from '../../lib/contactLinks'

function ContactCta({ profile }) {
  const email = getEmailAddress(profile.email)
  const mailtoLink = getMailtoLink(email, 'Portfolio inquiry')

  return (
    <section className="relative z-10 px-4 py-10 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-6 rounded-md border border-[#2FA084]/18 bg-gradient-to-br from-[#1F6F5F] via-[#2FA084] to-[#6FCF97] p-6 text-white shadow-[0_28px_70px_rgba(31,111,95,0.22)] md:grid-cols-[1fr_auto] md:items-center md:p-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/74">Ready to collaborate</p>
          <h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">Have an idea? Let&apos;s build something clean and useful.</h2>
          <p className="mt-3 max-w-2xl leading-7 text-white/78">
            Share your project, internship opportunity, or feedback and I will get back to you with a practical next step.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 md:justify-end">
          {email && (
            <a href={mailtoLink} className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-black text-[#1F6F5F] shadow-xl">
              <FiMail />
              Email Me
            </a>
          )}
          <a href="#contact" className="inline-flex items-center gap-2 rounded-md border border-white/28 bg-white/14 px-5 py-3 text-sm font-black text-white backdrop-blur transition hover:bg-white/22">
            Contact Form
            <FiArrowRight />
          </a>
        </div>
      </div>
    </section>
  )
}

export default ContactCta
