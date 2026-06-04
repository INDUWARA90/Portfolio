import { FiMessageCircle, FiStar } from 'react-icons/fi'
import EmptyState from '../ui/EmptyState'
import SectionHeader from '../ui/SectionHeader'

function normalizeFeedback(feedback) {
  if (!Array.isArray(feedback) || feedback.length === 0) return []

  return feedback.map((item) => ({
    quote: item.quote || item.message || item.text || '',
    name: item.name || item.author || '',
    role: item.role || item.title || item.company || '',
  })).filter((item) => item.quote)
}

function Feedback({ feedback }) {
  const visibleFeedback = normalizeFeedback(feedback).slice(0, 3)
  const [featuredFeedback, ...supportingFeedback] = visibleFeedback

  return (
    <section id="feedback" className="section-band px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Feedback"
          title="Project feedback"
          description="Notes from people connected to the work."
        />

        {visibleFeedback.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <article className="rounded-md border border-[#2FA084]/18 bg-gradient-to-br from-[#1F6F5F] via-[#2FA084] to-[#6FCF97] p-6 text-white shadow-[0_28px_70px_rgba(31,111,95,0.2)] md:p-8">
              <div className="flex items-center gap-2 text-[#6FCF97]">
                {[0, 1, 2, 3, 4].map((item) => <FiStar key={item} className="fill-current" />)}
              </div>
              <p className="mt-6 text-2xl font-semibold leading-10">&ldquo;{featuredFeedback.quote}&rdquo;</p>
              {(featuredFeedback.name || featuredFeedback.role) && (
                <div className="mt-8 flex items-center gap-4">
                  {featuredFeedback.name && (
                    <div className="grid h-14 w-14 place-items-center rounded-md bg-white text-xl font-black text-[#1F6F5F]">
                      {featuredFeedback.name.slice(0, 1)}
                    </div>
                  )}
                  <div>
                    {featuredFeedback.name && <h3 className="font-black">{featuredFeedback.name}</h3>}
                    {featuredFeedback.role && <p className="mt-1 text-sm font-semibold text-white/72">{featuredFeedback.role}</p>}
                  </div>
                </div>
              )}
            </article>

            <div className="grid gap-5">
              {supportingFeedback.map((item, index) => (
                <article key={`${item.name}-${item.role}-${index}`} className="premium-card rounded-md p-6">
                  <div className="flex items-start gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-[#6FCF97] text-xl text-[#1F6F5F]">
                      <FiMessageCircle />
                    </div>
                    <div>
                      <p className="leading-7 text-[#1F6F5F]/76">&ldquo;{item.quote}&rdquo;</p>
                      {(item.name || item.role) && (
                        <div className="mt-4 border-t border-[#1F6F5F]/10 pt-4">
                          {item.name && <h3 className="font-black text-[#1F6F5F]">{item.name}</h3>}
                          {item.role && <p className="mt-1 text-sm font-semibold text-[#2FA084]">{item.role}</p>}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <EmptyState title="Feedback coming soon" message="Project notes and collaborator feedback will be shared here soon." />
        )}
      </div>
    </section>
  )
}

export default Feedback
