import { useState } from 'react'
import fallbackCertificateImage from '../../assets/P01.png'
import SectionHeader from '../ui/SectionHeader'

function Certificates({ certifications }) {
  const [selected, setSelected] = useState(null)

  return (
    <section id="certificates" className="section-band px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Certificates" title="Proof of continuous learning" description="A gallery-style certificate area ready for hosted certificate images and verification links." />
        <div className="grid gap-6 md:grid-cols-2">
          {certifications.map((certificate) => (
            <button key={certificate.id} onClick={() => setSelected(certificate)} className="premium-card overflow-hidden rounded-md text-left">
              <div className="overflow-hidden">
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="h-56 w-full object-cover transition duration-500 hover:scale-105"
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.src = fallbackCertificateImage
                  }}
                />
              </div>
              <div className="p-5">
                <p className="text-sm text-cyan-300">{certificate.issuer} / {certificate.year}</p>
                <h3 className="mt-2 text-2xl font-semibold text-white light:text-slate-950">{certificate.title}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>
      {selected && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/80 p-4 backdrop-blur">
          <div className="glass-panel w-full max-w-2xl rounded-md p-5">
            <button onClick={() => setSelected(null)} className="btn-secondary mb-4 px-3 py-2 text-sm">Close</button>
            <img
              src={selected.image}
              alt={selected.title}
              className="w-full rounded-md"
              onError={(event) => {
                event.currentTarget.src = fallbackCertificateImage
              }}
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default Certificates
