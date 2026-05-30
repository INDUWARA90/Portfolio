import SectionHeader from '../ui/SectionHeader'

function GithubPanel({ github }) {
  const cards = [
    ['Public repos', github.publicRepos],
    ['Followers', github.followers],
    ['Following', github.following],
    ['Starred repos', github.starredRepos],
  ]

  return (
    <section id="github" className="section-band px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="GitHub" title="Open-source footprint" description="This panel is ready for live GitHub API integration. Current values are editable from the dashboard content model." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(([label, value]) => (
            <div key={label} className="premium-card rounded-md p-6">
              <div className="text-3xl font-bold text-cyan-300 light:text-cyan-700">{value}</div>
              <div className="mt-2 text-sm text-slate-400 light:text-slate-600">{label}</div>
            </div>
          ))}
        </div>
        <a href={`https://github.com/${github.username}`} target="_blank" rel="noreferrer" className="btn-secondary mt-6 px-5 py-3 text-sm">
          View GitHub Profile
        </a>
      </div>
    </section>
  )
}

export default GithubPanel
