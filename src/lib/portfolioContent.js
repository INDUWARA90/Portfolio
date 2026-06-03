import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { initialContent } from '../data/siteContent'
import { db } from './firebase'

const CONTENT_DOC = doc(db, 'portfolio', 'content')

const legacyImageMap = {
  '/src/assets/Me.jpg': initialContent.profile.image,
  'src/assets/Me.jpg': initialContent.profile.image,
  '/src/assets/P01.png': initialContent.projects[0]?.image || '',
  'src/assets/P01.png': initialContent.projects[0]?.image || '',
}

function isDeployableImageUrl(value) {
  if (!value || typeof value !== 'string') return false
  if (value.startsWith('/src/') || value.includes('/src/assets/')) return false

  return (
    value.startsWith('https://') ||
    value.startsWith('http://') ||
    value.startsWith('/assets/') ||
    value.startsWith('data:image/')
  )
}

function resolveImageUrl(value, fallback = '') {
  if (legacyImageMap[value]) return legacyImageMap[value]
  if (isDeployableImageUrl(value)) return value

  return fallback
}

function normalizePortfolioContent(content) {
  const defaultProjectImage = initialContent.projects[0]?.image || ''
  const defaultCertificateImage = initialContent.certifications[0]?.image || ''

  const profile = {
    ...initialContent.profile,
    ...content.profile,
    image: resolveImageUrl(content.profile?.image, initialContent.profile.image || ''),
  }

  const projects = Array.isArray(content.projects)
    ? content.projects.map((project, index) => {
        const fallback = initialContent.projects.find((item) => item.id === project.id) || initialContent.projects[index] || {}

        return {
          ...fallback,
          ...project,
          image: resolveImageUrl(project.image, fallback.image || defaultProjectImage),
        }
      })
    : initialContent.projects

  const certifications = Array.isArray(content.certifications)
    ? content.certifications.map((certificate, index) => {
        const fallback = initialContent.certifications.find((item) => item.id === certificate.id) || initialContent.certifications[index] || {}

        return {
          ...fallback,
          ...certificate,
          image: resolveImageUrl(certificate.image, fallback.image || defaultCertificateImage),
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
