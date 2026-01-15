import { db } from '@/lib/firebase'
import type { AgendaEvent } from '@/types/admin'
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore'

const COLLECTION_NAME = 'agenda'

export const addEvent = async (
  date: string,
  venue: string
): Promise<{ id: string; error: null } | { id: null; error: string }> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      date,
      venue,
      createdAt: Timestamp.now(),
    })
    return { id: docRef.id, error: null }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An error occurred'
    return { id: null, error: errorMessage }
  }
}

export const getAllEvents = async (): Promise<AgendaEvent[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)

    const events: AgendaEvent[] = []
    for (const docSnap of querySnapshot.docs) {
      const data = docSnap.data()
      events.push({
        id: docSnap.id,
        date: data.date,
        venue: data.venue,
        createdAt: data.createdAt.toDate(),
      })
    }

    return events
  } catch (error) {
    console.error('Error getting events:', error)
    return []
  }
}

export const deleteEvent = async (
  id: string
): Promise<{ error: null } | { error: string }> => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id))
    return { error: null }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An error occurred'
    return { error: errorMessage }
  }
}
