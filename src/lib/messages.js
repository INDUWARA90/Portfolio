import { addDoc, collection, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

const MESSAGES_COLLECTION = collection(db, 'messages')

export async function sendContactMessage(message) {
  await addDoc(MESSAGES_COLLECTION, {
    ...message,
    createdAt: serverTimestamp(),
  })
}

export async function getContactMessages() {
  const snapshot = await getDocs(query(MESSAGES_COLLECTION, orderBy('createdAt', 'desc')))

  return snapshot.docs.map((messageDoc) => ({
    id: messageDoc.id,
    ...messageDoc.data(),
  }))
}
