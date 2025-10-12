import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  NextOrObserver,
} from 'firebase/auth';
import { auth } from './config';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './config';

// Interfaces
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  createdAt: Date;
  updatedAt: Date;
  escolaId?: string;
  telefone?: string;
  materia?: string;
  biografia?: string;
  configuracoes?: {
    tema: 'light' | 'dark';
    notificacoes: boolean;
    linguagem: string;
  };
  estatisticas?: {
    totalRelatorios: number;
    totalAlunos: number;
    ultimoAcesso: Date;
  };
  ativo: boolean;
}

export interface SignUpData {
  email: string;
  password: string;
  displayName: string;
  telefone?: string;
  materia?: string;
  escolaId?: string;
}

// Provider do Google
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');

// Funções de autenticação
export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    
    // Atualizar último acesso
    await updateLastAccess(result.user.uid);
    
    return result.user;
  } catch (error: any) {
    throw new Error(getAuthErrorMessage(error.code));
  }
};

export const signUp = async (data: SignUpData): Promise<User> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, data.email, data.password);
    
    // Atualizar perfil do usuário
    await updateProfile(result.user, {
      displayName: data.displayName,
    });

    // Criar documento do usuário no Firestore
    const userProfile: Omit<UserProfile, 'uid'> = {
      email: data.email,
      displayName: data.displayName,
      photoURL: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      escolaId: data.escolaId,
      telefone: data.telefone,
      materia: data.materia,
      configuracoes: {
        tema: 'light',
        notificacoes: true,
        linguagem: 'pt-BR',
      },
      estatisticas: {
        totalRelatorios: 0,
        totalAlunos: 0,
        ultimoAcesso: new Date(),
      },
      ativo: true,
    };

    await setDoc(doc(db, 'users', result.user.uid), {
      ...userProfile,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      'estatisticas.ultimoAcesso': serverTimestamp(),
    });

    return result.user;
  } catch (error: any) {
    throw new Error(getAuthErrorMessage(error.code));
  }
};

export const signInWithGoogle = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    
    // Verificar se o usuário já existe no Firestore
    const userDoc = await getDoc(doc(db, 'users', result.user.uid));
    
    if (!userDoc.exists()) {
      // Criar documento do usuário se não existir
      const userProfile: Omit<UserProfile, 'uid'> = {
        email: result.user.email!,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        createdAt: new Date(),
        updatedAt: new Date(),
        configuracoes: {
          tema: 'light',
          notificacoes: true,
          linguagem: 'pt-BR',
        },
        estatisticas: {
          totalRelatorios: 0,
          totalAlunos: 0,
          ultimoAcesso: new Date(),
        },
        ativo: true,
      };

      await setDoc(doc(db, 'users', result.user.uid), {
        ...userProfile,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        'estatisticas.ultimoAcesso': serverTimestamp(),
      });
    } else {
      // Atualizar último acesso
      await updateLastAccess(result.user.uid);
    }

    return result.user;
  } catch (error: any) {
    throw new Error(getAuthErrorMessage(error.code));
  }
};

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error('Erro ao fazer logout');
  }
};

export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw new Error(getAuthErrorMessage(error.code));
  }
};

export const updateUserPassword = async (
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  if (!auth.currentUser) {
    throw new Error('Usuário não autenticado');
  }

  try {
    // Reautenticar usuário
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email!,
      currentPassword
    );
    await reauthenticateWithCredential(auth.currentUser, credential);

    // Atualizar senha
    await updatePassword(auth.currentUser, newPassword);
  } catch (error: any) {
    throw new Error(getAuthErrorMessage(error.code));
  }
};

export const updateUserProfile = async (
  profileData: Partial<Omit<UserProfile, 'uid' | 'createdAt' | 'updatedAt'>>
): Promise<void> => {
  if (!auth.currentUser) {
    throw new Error('Usuário não autenticado');
  }

  try {
    // Atualizar perfil do Firebase Auth se necessário
    const authUpdates: any = {};
    if (profileData.displayName) authUpdates.displayName = profileData.displayName;
    if (profileData.photoURL) authUpdates.photoURL = profileData.photoURL;

    if (Object.keys(authUpdates).length > 0) {
      await updateProfile(auth.currentUser, authUpdates);
    }

    // Atualizar documento do Firestore
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      ...profileData,
      updatedAt: serverTimestamp(),
    });
  } catch (error: any) {
    throw new Error('Erro ao atualizar perfil');
  }
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    
    if (!userDoc.exists()) {
      return null;
    }

    const data = userDoc.data();
    return {
      uid,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
      estatisticas: {
        ...data.estatisticas,
        ultimoAcesso: data.estatisticas?.ultimoAcesso?.toDate() || new Date(),
      },
    } as UserProfile;
  } catch (error) {
    console.error('Erro ao buscar perfil do usuário:', error);
    return null;
  }
};

export const updateLastAccess = async (uid: string): Promise<void> => {
  try {
    await updateDoc(doc(db, 'users', uid), {
      'estatisticas.ultimoAcesso': serverTimestamp(),
    });
  } catch (error) {
    console.error('Erro ao atualizar último acesso:', error);
  }
};

// Observer para mudanças de autenticação
export const onAuthStateChange = (callback: NextOrObserver<User>): (() => void) => {
  return onAuthStateChanged(auth, callback);
};

// Função para mapear códigos de erro do Firebase para mensagens em português
const getAuthErrorMessage = (errorCode: string): string => {
  const errorMessages: { [key: string]: string } = {
    'auth/user-not-found': 'Usuário não encontrado',
    'auth/wrong-password': 'Senha incorreta',
    'auth/email-already-in-use': 'Este email já está em uso',
    'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres',
    'auth/invalid-email': 'Email inválido',
    'auth/user-disabled': 'Conta desabilitada',
    'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde',
    'auth/network-request-failed': 'Erro de conexão',
    'auth/requires-recent-login': 'É necessário fazer login novamente',
    'auth/popup-closed-by-user': 'Login cancelado pelo usuário',
    'auth/popup-blocked': 'Popup bloqueado pelo navegador',
  };

  return errorMessages[errorCode] || 'Erro de autenticação';
};