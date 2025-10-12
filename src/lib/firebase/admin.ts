
import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

if (!admin.apps.length) {
  const serviceAccountPath = path.resolve(process.cwd(), 'firebase-private-key.pem');

  let privateKey;
  try {
    privateKey = fs.readFileSync(serviceAccountPath, 'utf8');
  } catch (error) {
    console.error('Firebase Admin SDK: Could not read firebase-private-key.pem:', error);
    throw new Error('Firebase Admin SDK: firebase-private-key.pem not found or unreadable.');
  }

  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  console.log('Firebase Admin SDK: FIREBASE_CLIENT_EMAIL:', clientEmail);

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: clientEmail,
      privateKey: privateKey,
    }),
    databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`
  });
}

export const auth = admin.auth();
export const db = admin.firestore();
