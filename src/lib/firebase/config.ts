import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Environment variables will be validated during Firebase app initialization

// Inicializar Firebase App
const app = initializeApp(firebaseConfig);

// Inicializar serviços
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Configuração para desenvolvimento (emulators)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const hostname = 'localhost';
  
  // Conectar aos emuladores se estiverem rodando
  try {
    // Firebase Auth Emulator
    if (!auth.config.emulator) {
      connectAuthEmulator(auth, `http://${hostname}:9099`, {
        disableWarnings: true,
      });
    }

    // Firestore Emulator
    if (!(db as any)._delegate._databaseId.projectId.includes('demo-')) {
      connectFirestoreEmulator(db, hostname, 8080);
    }

    // Storage Emulator
    if (!(storage as any)._host) {
      connectStorageEmulator(storage, hostname, 9199);
    }
  } catch (error) {
    // Emulators não estão rodando, usar Firebase production
    console.info('Firebase emulators not running, using production Firebase');
  }
}

export default app;