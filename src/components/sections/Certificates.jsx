import { useState } from 'react'
import { FiArrowUpRight, FiAward, FiEye } from 'react-icons/fi'
import fallbackCertificateImage from '../../assets/P01.png'
import SectionHeader from '../ui/SectionHeader'

function Certificates({ certifications }) {
  const [selected, setSelected] = useState(null)

  return (
    <section id="certificates" className="section-band px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Certificates" title="Proof of continuous learning" description="Courses, credentials, and milestones that support practical project work." />
        <div className="mx-auto grid max-w-6xl gap-7 md:grid-cols-2">
          {certifications.map((certificate) => (
            <article key={certificate.id} className="premium-card overflow-hidden rounded-md">
              <button onClick={() => setSelected(certificate)} className="block w-full text-left">
                <div className="relative overflow-hidden bg-[#EEEEEE]">
                {certificate.image && (
                  <img
                    src={certificate.image}
                    alt={certificate.title}
                    className="h-72 w-full object-cover transition duration-500 hover:scale-105"
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.src = fallbackCertificateImage
                    }}
                  />
                )}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1F6F5F]/60 to-transparent" />
                  <span className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-md bg-white/92 text-xl text-[#2FA084] shadow-xl">
                    <FiAward />
                  </span>
              </div>
              </button>

              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2">
                  {certificate.issuer && <p className="rounded-md bg-[#6FCF97]/24 px-3 py-1 text-xs font-black text-[#2FA084]">{certificate.issuer}</p>}
                  {certificate.year && <p className="rounded-md bg-white/70 px-3 py-1 text-xs font-black text-[#1F6F5F]/70">{certificate.year}</p>}
                </div>
                <h3 className="mt-4 text-2xl font-black text-[#1F6F5F] light:text-slate-950">{certificate.title}</h3>
                {certificate.category && <p className="mt-2 text-sm font-semibold text-[#1F6F5F]/62">{certificate.category}</p>}
                <div className="mt-5 flex flex-wrap gap-3">
                  <button onClick={() => setSelected(certificate)} className="btn-secondary gap-2 px-4 py-2 text-sm">
                    <FiEye />
                    Preview
                  </button>
                  {certificate.verification && (
                    <a href={certificate.verification} target="_blank" rel="noreferrer" className="btn-primary gap-2 px-4 py-2 text-sm">
                      Verify
                      <FiArrowUpRight />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      {selected && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#1F6F5F]/45 p-4 backdrop-blur">
          <div className="glass-panel w-full max-w-3xl rounded-md p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-[#2FA084]">{selected.issuer} {selected.year ? `/ ${selected.year}` : ''}</p>
                <h3 className="text-2xl font-black text-[#1F6F5F]">{selected.title}</h3>
              </div>
              <button onClick={() => setSelected(null)} className="btn-secondary px-3 py-2 text-sm">Close</button>
            </div>
            {selected.image && (
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full rounded-md"
                onError={(event) => {
                  event.currentTarget.src = fallbackCertificateImage
                }}
              />
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default Certificates
