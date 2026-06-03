import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { initialContent } from '../data/siteContent'
import { db } from './firebase'

const CONTENT_DOC = doc(db, 'portfolio', 'content')

function isDeployableImageUrl(value) {
  if (!value || typeof value !== 'string') return false

  return (
    value.startsWith('https://') ||
    value.startsWith('http://') ||
    value.startsWith('/assets/') ||
    value.startsWith('data:image/')
  )
}

function normalizePortfolioContent(content) {
  const defaultProjectImage = initialContent.projects[0]?.image || ''
  const defaultCertificateImage = initialContent.certifications[0]?.image || ''

  const profile = {
    ...initialContent.profile,
    ...content.profile,
    image: isDeployableImageUrl(content.profile?.image) ? content.profile.image : initialContent.profile.image || '',
  }

  const projects = Array.isArray(content.projects)
    ? content.projects.map((project, index) => {
        const fallback = initialContent.projects.find((item) => item.id === project.id) || initialContent.projects[index] || {}

        return {
          ...fallback,
          ...project,
          image: isDeployableImageUrl(project.image) ? project.image : fallback.image || defaultProjectImage,
        }
      })
    : initialContent.projects

  const certifications = Array.isArray(content.certifications)
    ? content.certifications.map((certificate, index) => {
        const fallback = initialContent.certifications.find((item) => item.id === certificate.id) || initialContent.certifications[index] || {}

        return {
          ...fallback,
          ...certificate,
          image: isDeployableImageUrl(certificate.image) ? certificate.image : fallback.image || defaultCertificateImage,
        }
      })
    : initialContent.certifications

  return {
    ...initialContent,
    ...content,
    profile,
    projects,
    certifications,
  }
}

export function getSafePortfolioContent(content) {
  return normalizePortfolioContent(content)
}

export async function getPortfolioContent() {
  const snapshot = await getDoc(CONTENT_DOC)

  if (!snapshot.exists()) {
    return initialContent
  }

  const content = { ...snapshot.data() }
  delete content.updatedAt

  return normalizePortfolioContent(content)
}

export async function savePortfolioContent(content) {
  const safeContent = normalizePortfolioContent(content)

  await setDoc(CONTENT_DOC, {
    ...safeContent,
    updatedAt: serverTimestamp(),
  })
}

export async function resetPortfolioContent() {
  await savePortfolioContent(initialContent)
  return initialContent
}
