
import { NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebase/admin';
import { registerSchema } from '@/lib/schemas/auth';

export async function POST(request: Request) {
  try {
    console.log('Register API: Request received');
    const body = await request.json();
    console.log('Register API: Request body:', body);
    const { email, password, name, school } = registerSchema.parse(body);
    console.log('Register API: Parsed data:', { email, password, name, school });

    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    });
    console.log('Register API: User created in Firebase Auth:', userRecord.uid);

    await db.collection('users').doc(userRecord.uid).set({
      name,
      email,
      schoolId: school,
      createdAt: new Date(),
    });
    console.log('Register API: User document created in Firestore');

    return NextResponse.json({ success: true, uid: userRecord.uid });
  } catch (error) {
    console.error('Register API: Error during registration:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
