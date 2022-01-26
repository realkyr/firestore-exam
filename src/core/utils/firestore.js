import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

// firebaseApps previously initialized using initializeApp()
export const getFirestoreInstance = () => {
  const db = getFirestore()

  return db
}
