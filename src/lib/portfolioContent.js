import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { initialContent } from '../data/siteContent'
import { db } from './firebase'

const CONTENT_DOC = doc(db, 'portfolio', 'content')

export async function getPortfolioContent() {
  const snapshot = await getDoc(CONTENT_DOC)

  if (!snapshot.exists()) {
    return initialContent
  }

  const content = { ...snapshot.data() }
  delete content.updatedAt

  return content
}

export async function savePortfolioContent(content) {
  await setDoc(CONTENT_DOC, {
    ...content,
    updatedAt: serverTimestamp(),
  })
}

export async function resetPortfolioContent() {
  await savePortfolioContent(initialContent)
  return initialContent
}
