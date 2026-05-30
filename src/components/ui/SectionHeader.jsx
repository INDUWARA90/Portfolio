function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <p className="text-sm font-bold uppercase tracking-[0.24em] text-teal-300 light:text-sky-700">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-50 light:text-slate-950 md:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-sm leading-7 text-slate-300 light:text-slate-600 md:text-base">{description}</p>}
    </div>
  )
}

export default SectionHeader
