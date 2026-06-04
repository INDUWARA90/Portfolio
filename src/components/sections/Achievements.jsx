import { FiAward, FiExternalLink, FiTrendingUp } from 'react-icons/fi'
import fallbackAchievementImage from '../../assets/P01.png'
import EmptyState from '../ui/EmptyState'
import SectionHeader from '../ui/SectionHeader'

function Achievements({ achievements }) {
  const visibleAchievements = Array.isArray(achievements)
    ? achievements.filter((achievement) => achievement?.title || achievement?.description || achievement?.issuer || achievement?.image)
    : []

  return (
    <section id="achievements" className="section-band px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Achievements"
          title="Milestones worth noting"
          description="Highlights from projects, learning, competitions, and recognized work."
        />

        {visibleAchievements.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {visibleAchievements.map((achievement, index) => (
              <article key={achievement.id || `${achievement.title}-${index}`} className="premium-card overflow-hidden rounded-md">
                {achievement.image && (
                  <div className="relative overflow-hidden bg-[#EEEEEE]">
                    <img
                      src={achievement.image}
                      alt={achievement.title || 'Achievement'}
                      className="h-72 w-full object-cover transition duration-500 hover:scale-105 md:h-80"
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.src = fallbackAchievementImage
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#1F6F5F]/55 to-transparent" />
                  </div>
                )}

                <div className="flex items-start gap-4 p-6">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-[#6FCF97] text-xl text-[#1F6F5F]">
                    <FiAward />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      {achievement.year && (
                        <span className="rounded-md bg-[#6FCF97]/24 px-3 py-1 text-xs font-black text-[#2FA084]">
                          {achievement.year}
                        </span>
                      )}
                      {achievement.issuer && (
                        <span className="rounded-md bg-white/70 px-3 py-1 text-xs font-black text-[#1F6F5F]/70 light:bg-slate-100">
                          {achievement.issuer}
                        </span>
                      )}
                    </div>

                    {achievement.title && <h3 className="mt-4 text-2xl font-black text-[#1F6F5F] light:text-slate-950">{achievement.title}</h3>}
                    {achievement.description && <p className="mt-3 leading-7 text-[#1F6F5F]/76 light:text-slate-700">{achievement.description}</p>}

                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      {achievement.category && (
                        <span className="soft-chip px-3 py-2 text-xs font-bold">
                          <FiTrendingUp />
                          {achievement.category}
                        </span>
                      )}
                      {achievement.link && (
                        <a href={achievement.link} target="_blank" rel="noreferrer" className="btn-secondary gap-2 px-4 py-2 text-sm">
                          View
                          <FiExternalLink />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState title="Achievements coming soon" message="Notable milestones and recognized work will be shared here soon." />
        )}
      </div>
    </section>
  )
}

export default Achievements
