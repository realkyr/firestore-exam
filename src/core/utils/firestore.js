import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

// firebaseApps previously initialized using initializeApp()
export const getFirestoreInstance = () => {
  const db = getFirestore()

  if (process.env.NODE_ENV === 'development') {

    if(typeof window === 'undefined' || !window['_init']) {
      connectFirestoreEmulator(db, 'localhost', 8080)
      if(typeof window !== 'undefined') {
        window['_init'] = true
      }
    }

  }

  return db
}
