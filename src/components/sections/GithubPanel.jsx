import { useEffect, useMemo, useState } from 'react'
import { FiArrowUpRight, FiGitBranch, FiGithub, FiRefreshCw, FiUserCheck, FiUsers } from 'react-icons/fi'
import SectionHeader from '../ui/SectionHeader'

function getGithubUsername(github, socials) {
  if (github.username?.trim()) return github.username.trim()

  const githubUrl = socials?.find((social) => social.label?.toLowerCase() === 'github')?.href
  if (!githubUrl) return ''

  try {
    const url = new URL(githubUrl)
    return url.pathname.split('/').filter(Boolean)[0] || ''
  } catch {
    return githubUrl
      .replace('https://github.com/', '')
      .replace('http://github.com/', '')
      .split('/')
      .filter(Boolean)[0] || ''
  }
}

function GithubPanel({ github, socials = [] }) {
  const username = useMemo(() => getGithubUsername(github, socials), [github, socials])
  const [liveGithub, setLiveGithub] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!username) return

    const controller = new AbortController()

    async function loadGithubStats() {
      setIsLoading(true)
      setError('')

      try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`, { signal: controller.signal })

        if (!userResponse.ok) {
          throw new Error('GitHub profile not found.')
        }

        const user = await userResponse.json()

        setLiveGithub({
          publicRepos: user.public_repos,
          followers: user.followers,
          following: user.following,
          profileUrl: user.html_url,
          avatarUrl: user.avatar_url,
          bio: user.bio,
          displayName: user.name,
          login: user.login,
        })
      } catch (githubError) {
        if (githubError.name !== 'AbortError') {
          setError(githubError.message)
          setLiveGithub(null)
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadGithubStats()

    return () => {
      controller.abort()
    }
  }, [username])

  const stats = liveGithub || github
  const cards = [
    ['Public repos', stats.publicRepos, FiGitBranch, 'Projects and experiments shared publicly.'],
    ['Followers', stats.followers, FiUsers, 'Developers following this profile.'],
    ['Following', stats.following, FiUserCheck, 'Accounts followed for ideas and updates.'],
  ]
  const profileUrl = liveGithub?.profileUrl || (username ? `https://github.com/${username}` : '')
  const profileName = liveGithub?.displayName || liveGithub?.login || username || 'GitHub profile'
  const profileBio = liveGithub?.bio || 'Connect the portfolio to a GitHub username to show live public activity.'

  return (
    <section id="github" className="section-band px-4 py-14 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="GitHub" title="Open-source footprint" description="A quick look at public GitHub activity and profile details." />

        <div className="mx-auto max-w-5xl rounded-md border border-[#1F6F5F]/12 bg-white/80 p-5 shadow-[0_24px_64px_rgba(31,111,95,0.1)] backdrop-blur md:p-6">
          <div className="grid items-center gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-md border border-[#2FA084]/16 bg-gradient-to-br from-[#6FCF97]/38 via-white to-[#EEEEEE] p-5">
              <div className="flex items-center gap-4">
                {liveGithub?.avatarUrl ? (
                  <img src={liveGithub.avatarUrl} alt={`${profileName} GitHub avatar`} className="h-16 w-16 rounded-md object-cover shadow-[0_14px_28px_rgba(31,111,95,0.18)]" />
                ) : (
                  <div className="grid h-16 w-16 place-items-center rounded-md bg-[#2FA084] text-3xl text-white">
                    <FiGithub />
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="truncate text-xl font-black text-[#1F6F5F] sm:text-2xl">{profileName}</h3>
                  {username && <p className="mt-1 text-sm font-bold text-[#2FA084]">@{username}</p>}
                </div>
              </div>
              <p className="mt-5 leading-7 text-[#1F6F5F]/74">{profileBio}</p>

              <div className="mt-5 flex flex-wrap gap-3">
                <span className="soft-chip px-4 py-2 text-sm font-bold">
                  <FiRefreshCw />
                  {isLoading ? 'Syncing' : liveGithub ? 'Live data' : 'Fallback data'}
                </span>
                {profileUrl && (
                  <a href={profileUrl} target="_blank" rel="noreferrer" className="btn-primary gap-2 px-4 py-2 text-sm">
                    Visit Profile
                    <FiArrowUpRight />
                  </a>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {cards.map(([label, value, Icon, helpText]) => (
                <div key={label} className="premium-card rounded-md p-5 text-center sm:text-left">
                  <div className="mx-auto grid h-11 w-11 place-items-center rounded-md bg-[#6FCF97] text-xl text-[#1F6F5F] sm:mx-0">
                    <Icon />
                  </div>
                  <div className="mt-4 text-3xl font-black text-[#2FA084] light:text-cyan-700">{isLoading ? '...' : value || '0'}</div>
                  <div className="mt-1 text-sm font-bold text-[#1F6F5F]">{label}</div>
                  <p className="mt-3 text-xs leading-5 text-[#1F6F5F]/58">{helpText}</p>
                </div>
              ))}
            </div>
          </div>

          {!username && (
            <p className="mt-4 rounded-md border border-[#2FA084]/16 bg-[#6FCF97]/14 px-4 py-3 text-sm font-semibold text-[#1F6F5F]">
              GitHub activity will appear here when a public profile is available.
            </p>
          )}
          {error && <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{error}</p>}
        </div>
      </div>
    </section>
  )
}

export default GithubPanel
