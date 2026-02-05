import { db, storage } from '@/lib/firebase'
import type { Settings } from '@/types/admin'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage'

const SETTINGS_DOC_ID = 'general'
const COLLECTION_NAME = 'settings'

export const getSettings = async (): Promise<Settings> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, SETTINGS_DOC_ID)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data() as Settings
    }

    return {}
  } catch (error) {
    console.error('Error fetching settings:', error)
    return {}
  }
}

export const updateSettings = async (
  settings: Partial<Settings>
): Promise<{ success: boolean; error: string | null }> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, SETTINGS_DOC_ID)
    await setDoc(docRef, settings, { merge: true })
    return { success: true, error: null }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An error occurred'
    return { success: false, error: errorMessage }
  }
}

export const uploadPressKit = async (
  file: File
): Promise<{ url: string; error: null } | { url: null; error: string }> => {
  try {
    const fileName = 'press-kit.pdf'
    const storageRef = ref(storage, `press-kit/${fileName}`)

    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)

    await updateSettings({ pressKitUrl: url })

    return { url, error: null }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An error occurred'
    return { url: null, error: errorMessage }
  }
}

export const deletePressKit = async (): Promise<{
  success: boolean
  error: string | null
}> => {
  try {
    const fileName = 'press-kit.pdf'
    const storageRef = ref(storage, `press-kit/${fileName}`)

    await deleteObject(storageRef)

    await updateSettings({ pressKitUrl: '' })

    return { success: true, error: null }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An error occurred'
    return { success: false, error: errorMessage }
  }
}
