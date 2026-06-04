function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mx-auto mb-8 max-w-3xl text-center md:mb-12">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2FA084] light:text-sky-700 sm:text-sm sm:tracking-[0.24em]">{eyebrow}</p>
      <h2 className="mt-3 break-words text-2xl font-extrabold leading-tight text-[#1F6F5F] light:text-slate-950 sm:text-3xl md:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-sm leading-7 text-[#1F6F5F]/72 light:text-slate-600 md:text-base">{description}</p>}
    </div>
  )
}

export default SectionHeader
