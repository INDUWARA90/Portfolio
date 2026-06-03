function Footer({ profile, socials }) {
  return (
    <footer className="relative z-10 border-t border-[#1F6F5F]/10 bg-white/82 px-4 py-10 text-[#1F6F5F] backdrop-blur-xl light:border-slate-200 light:bg-white/95 light:text-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{profile.name}</h2>
          <p className="mt-2 text-sm text-[#1F6F5F]/65 light:text-slate-600">{profile.role} building modern web experiences.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="btn-secondary px-4 py-2 text-sm">
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
