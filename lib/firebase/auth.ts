import { auth } from '@/lib/firebase'
import { FirebaseError } from 'firebase/app'
import {
  type User,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth'

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    return { user: userCredential.user, error: null }
  } catch (error) {
    const errorMessage =
      error instanceof FirebaseError ? error.message : 'An error occurred'
    return { user: null, error: errorMessage }
  }
}

export const signOut = async () => {
  try {
    await firebaseSignOut(auth)
    return { error: null }
  } catch (error) {
    const errorMessage =
      error instanceof FirebaseError ? error.message : 'An error occurred'
    return { error: errorMessage }
  }
}

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback)
}

export const getCurrentUser = () => {
  return auth.currentUser
}
