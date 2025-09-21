'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '@/lib/firebase';
import { User, AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para criar/atualizar usuário no Firestore
  const createUserDocument = async (firebaseUser: FirebaseUser, additionalData?: any) => {
    if (!firebaseUser) return;

    const userRef = doc(db, 'users', firebaseUser.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const { displayName, email } = firebaseUser;
      const createdAt = new Date();

      // Filtrar valores undefined antes de salvar no Firestore
      const userData: any = {
        email,
        role: 'teacher', // Default role
        createdAt,
        ...additionalData
      };

      // Só adiciona displayName se não for undefined
      if (displayName) {
        userData.displayName = displayName;
      }

      try {
        await setDoc(userRef, userData);
      } catch (error) {
        console.error('Error creating user document:', error);
      }
    }

    return userSnap;
  };

  // Função para converter FirebaseUser para User
  const mapFirebaseUserToUser = async (firebaseUser: FirebaseUser): Promise<User> => {
    const userRef = doc(db, 'users', firebaseUser.uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      return {
        uid: firebaseUser.uid,
        email: firebaseUser.email!,
        displayName: firebaseUser.displayName || userData.displayName || undefined,
        role: userData.role || 'teacher',
        schoolId: userData.schoolId || undefined,
        createdAt: userData.createdAt?.toDate() || new Date()
      };
    }

    // Fallback se não encontrar no Firestore
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email!,
      displayName: firebaseUser.displayName || undefined,
      role: 'teacher',
      createdAt: new Date()
    };
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await mapFirebaseUserToUser(firebaseUser);
          setUser(userData);
        } catch (error) {
          console.error('Error mapping user:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error.code);
      setError(errorMessage);
      throw error;
    }
  };

  const register = async (email: string, password: string, displayName?: string) => {
    try {
      setError(null);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Atualizar displayName se fornecido
      if (displayName) {
        await updateProfile(result.user, { displayName });
      }

      // Aguardar um pouco para garantir que o perfil foi atualizado
      await new Promise(resolve => setTimeout(resolve, 100));

      // Criar documento do usuário no Firestore
      await createUserDocument(result.user, { displayName });
      
      return result;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error.code);
      setError(errorMessage);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      
      // Criar documento do usuário se não existir
      await createUserDocument(result.user);
      
      return result;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error.code);
      setError(errorMessage);
      throw error;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
    } catch (error: any) {
      const errorMessage = getErrorMessage(error.code);
      setError(errorMessage);
      throw error;
    }
  };

  const clearError = () => {
    setError(null);
  };

  // Função para traduzir códigos de erro do Firebase
  const getErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'Usuário não encontrado. Verifique se o email está correto.';
      case 'auth/wrong-password':
        return 'Senha incorreta. Tente novamente.';
      case 'auth/invalid-credential':
        return 'Email ou senha incorretos. Verifique suas credenciais.';
      case 'auth/invalid-email':
        return 'Email inválido. Verifique o formato do email.';
      case 'auth/user-disabled':
        return 'Esta conta foi desabilitada. Entre em contato com o suporte.';
      case 'auth/too-many-requests':
        return 'Muitas tentativas de login. Aguarde alguns minutos e tente novamente.';
      case 'auth/network-request-failed':
        return 'Erro de conexão. Verifique sua internet e tente novamente.';
      case 'auth/email-already-in-use':
        return 'Este email já está em uso. Tente fazer login ou use outro email.';
      case 'auth/weak-password':
        return 'A senha deve ter pelo menos 6 caracteres.';
      case 'auth/operation-not-allowed':
        return 'Operação não permitida. Entre em contato com o suporte.';
      case 'auth/requires-recent-login':
        return 'Esta operação requer login recente. Faça login novamente.';
      case 'auth/popup-closed-by-user':
        return 'Login cancelado. Tente novamente.';
      case 'auth/cancelled-popup-request':
        return 'Login cancelado. Tente novamente.';
      case 'auth/popup-blocked':
        return 'Popup bloqueado pelo navegador. Permita popups para este site.';
      case 'auth/account-exists-with-different-credential':
        return 'Já existe uma conta com este email usando outro método de login.';
      case 'auth/credential-already-in-use':
        return 'Esta credencial já está sendo usada por outra conta.';
      case 'auth/invalid-verification-code':
        return 'Código de verificação inválido.';
      case 'auth/invalid-verification-id':
        return 'ID de verificação inválido.';
      case 'auth/missing-verification-code':
        return 'Código de verificação necessário.';
      case 'auth/missing-verification-id':
        return 'ID de verificação necessário.';
      case 'auth/quota-exceeded':
        return 'Limite de requisições excedido. Tente novamente mais tarde.';
      case 'auth/timeout':
        return 'Tempo limite excedido. Tente novamente.';
      default:
        return 'Erro inesperado. Tente novamente ou entre em contato com o suporte.';
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    loginWithGoogle,
    logout,
    clearError,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
