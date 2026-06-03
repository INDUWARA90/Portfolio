import { FiMessageCircle, FiStar } from 'react-icons/fi'
import SectionHeader from '../ui/SectionHeader'

const fallbackTestimonials = [
  {
    quote: 'Clear communication, careful UI work, and steady delivery are the standards I bring to every project.',
    name: 'Collaboration',
    role: 'Working style',
  },
  {
    quote: 'I focus on responsive interfaces, readable code, and practical decisions that help projects move forward.',
    name: 'Delivery',
    role: 'Build approach',
  },
  {
    quote: 'Each feature is shaped with the user in mind, from layout polish to small interaction details.',
    name: 'Product thinking',
    role: 'Design mindset',
  },
]

function normalizeTestimonials(testimonials) {
  if (!Array.isArray(testimonials) || testimonials.length === 0) return fallbackTestimonials

  return testimonials.map((testimonial) => ({
    quote: testimonial.quote || testimonial.message || testimonial.text || '',
    name: testimonial.name || testimonial.author || 'Project collaborator',
    role: testimonial.role || testimonial.title || testimonial.company || 'Feedback',
  })).filter((testimonial) => testimonial.quote)
}

function Testimonials({ testimonials }) {
  const visibleTestimonials = normalizeTestimonials(testimonials).slice(0, 3)
  const [featuredTestimonial, ...supportingTestimonials] = visibleTestimonials

  return (
    <section id="testimonials" className="section-band px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Testimonials"
          title="The experience I aim to create"
          description="A clear, collaborative, and polished process from first idea to final handoff."
        />

        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <article className="rounded-md border border-[#2FA084]/18 bg-gradient-to-br from-[#1F6F5F] via-[#2FA084] to-[#6FCF97] p-6 text-white shadow-[0_28px_70px_rgba(31,111,95,0.2)] md:p-8">
            <div className="flex items-center gap-2 text-[#6FCF97]">
              {[0, 1, 2, 3, 4].map((item) => <FiStar key={item} className="fill-current" />)}
            </div>
            <p className="mt-6 text-2xl font-semibold leading-10">&ldquo;{featuredTestimonial.quote}&rdquo;</p>
            <div className="mt-8 flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-md bg-white text-xl font-black text-[#1F6F5F]">
                {featuredTestimonial.name.slice(0, 1)}
              </div>
              <div>
                <h3 className="font-black">{featuredTestimonial.name}</h3>
                <p className="mt-1 text-sm font-semibold text-white/72">{featuredTestimonial.role}</p>
              </div>
            </div>
          </article>

          <div className="grid gap-5">
            {supportingTestimonials.map((testimonial) => (
              <article key={`${testimonial.name}-${testimonial.role}`} className="premium-card rounded-md p-6">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-[#6FCF97] text-xl text-[#1F6F5F]">
                    <FiMessageCircle />
                  </div>
                  <div>
                    <p className="leading-7 text-[#1F6F5F]/76">&ldquo;{testimonial.quote}&rdquo;</p>
                    <div className="mt-4 border-t border-[#1F6F5F]/10 pt-4">
                      <h3 className="font-black text-[#1F6F5F]">{testimonial.name}</h3>
                      <p className="mt-1 text-sm font-semibold text-[#2FA084]">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
