import { db, storage } from '@/lib/firebase'
import type { Media, MediaCategory, MediaType } from '@/types/admin'
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage'

const COLLECTION_NAME = 'media'

export const uploadMediaFile = async (
  file: File,
  category: MediaCategory
): Promise<string> => {
  const timestamp = Date.now()
  const fileName = `${category}/${timestamp}_${file.name}`
  const storageRef = ref(storage, fileName)

  await uploadBytes(storageRef, file)
  const downloadURL = await getDownloadURL(storageRef)

  return downloadURL
}

export const addMedia = async (
  title: string,
  url: string,
  category: MediaCategory,
  type: MediaType,
  link?: string
): Promise<{ id: string; error: null } | { id: null; error: string }> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      title,
      url,
      category,
      type,
      link: link || null,
      uploadedAt: Timestamp.now(),
    })
    return { id: docRef.id, error: null }
  } catch (error) {
    console.error('❌ Erro ao salvar:', error)
    const errorMessage =
      error instanceof Error ? error.message : 'An error occurred'
    return { id: null, error: errorMessage }
  }
}

export const getAllMedia = async (): Promise<Media[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('uploadedAt', 'desc')
    )
    const querySnapshot = await getDocs(q)

    const mediaList: Media[] = []
    for (const docSnap of querySnapshot.docs) {
      const data = docSnap.data()
      mediaList.push({
        id: docSnap.id,
        title: data.title,
        url: data.url,
        category: data.category,
        type: data.type,
        uploadedAt: data.uploadedAt.toDate(),
        link: data.link || undefined,
      })
    }

    return mediaList
  } catch (error) {
    console.error('Error getting media:', error)
    return []
  }
}

export const getMediaByCategory = async (
  category: MediaCategory
): Promise<Media[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('category', '==', category)
    )
    const querySnapshot = await getDocs(q)

    const mediaList: Media[] = []
    for (const docSnap of querySnapshot.docs) {
      const data = docSnap.data()
      mediaList.push({
        id: docSnap.id,
        title: data.title,
        url: data.url,
        category: data.category,
        type: data.type,
        uploadedAt: data.uploadedAt.toDate(),
        link: data.link || undefined,
      })
    }

    return mediaList.sort(
      (a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime()
    )
  } catch (error) {
    console.error('Error getting media by category:', error)
    return []
  }
}

// Deletar media
export const deleteMedia = async (
  id: string,
  url: string
): Promise<{ error: null } | { error: string }> => {
  try {
    // Delete from Firestore
    await deleteDoc(doc(db, COLLECTION_NAME, id))

    // Delete from Storage (extrair path do URL)
    try {
      const storageRef = ref(storage, url)
      await deleteObject(storageRef)
    } catch (storageError) {
      console.warn('Could not delete file from storage:', storageError)
    }

    return { error: null }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An error occurred'
    return { error: errorMessage }
  }
}
