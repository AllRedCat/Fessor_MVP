import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentSnapshot,
  QueryConstraint,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  increment,
  writeBatch,
} from 'firebase/firestore';
import { db } from './config';
import { auth } from './config';

// Interfaces baseadas no esquema do banco de dados
export interface Escola {
  escolaId: string;
  nome: string;
  endereco: {
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
  contato: {
    telefone: string;
    email: string;
    site?: string;
  };
  secretaria: {
    nome: string;
    telefone: string;
    email: string;
  };
  configuracoes: {
    niveis: string[];
    turnos: string[];
  };
  createdAt: Date;
  updatedAt: Date;
  ativa: boolean;
}

export interface Aluno {
  alunoId: string;
  professorId: string;
  escolaId: string;
  dadosPessoais: {
    nome: string;
    dataNascimento: string;
    idade: number;
    genero: string;
    foto?: string;
  };
  dadosEscolares: {
    turma: string;
    serie: string;
    turno: string;
    numeroMatricula: string;
    anoLetivo: string;
  };
  dadosFamiliares?: {
    responsavel1?: {
      nome: string;
      parentesco: string;
      telefone: string;
      email: string;
    };
    responsavel2?: {
      nome: string;
      parentesco: string;
      telefone: string;
      email: string;
    };
    endereco?: {
      rua: string;
      bairro: string;
      cidade: string;
      estado: string;
      cep: string;
    };
  };
  observacoes: {
    comportamentais?: string;
    academicas?: string;
    medicas?: string;
    gerais?: string;
  };
  estatisticas: {
    totalRelatorios: number;
    ultimoRelatorio?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
  ativo: boolean;
}

export interface Relatorio {
  relatorioId: string;
  professorId: string;
  alunoId: string;
  escolaId: string;
  metadados: {
    titulo: string;
    tipo: 'comportamental' | 'academico' | 'disciplinar' | 'mensal';
    periodo: {
      inicio: string;
      fim: string;
      bimestre?: string;
    };
    status: 'rascunho' | 'finalizado' | 'arquivado';
  };
  conteudo: {
    observacoesIniciais: string;
    relatorioGerado: string;
    observacoesFinais?: string;
    pontosFortes: string[];
    areasDesenvolvimento: string[];
    recomendacoes: string[];
  };
  configuracoes: {
    geradoPorIA: boolean;
    modeloIA?: string;
    versaoPrompt?: string;
    editadoManualmente: boolean;
  };
  historico: Array<{
    acao: string;
    data: Date;
    usuario: string;
  }>;
  compartilhamento?: {
    pdfGerado?: string;
    compartilhadoCom: Array<{
      email: string;
      data: Date;
      visualizado: boolean;
    }>;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Funções para Escolas
export const createEscola = async (escolaData: Omit<Escola, 'escolaId' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'escolas'), {
      ...escolaData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Erro ao criar escola:', error);
    throw new Error('Erro ao criar escola');
  }
};

export const getEscolas = async (): Promise<Escola[]> => {
  try {
    const q = query(
      collection(db, 'escolas'),
      where('ativa', '==', true),
      orderBy('nome')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      escolaId: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Escola[];
  } catch (error) {
    console.error('Erro ao buscar escolas:', error);
    throw new Error('Erro ao buscar escolas');
  }
};

export const getEscola = async (escolaId: string): Promise<Escola | null> => {
  try {
    const docRef = doc(db, 'escolas', escolaId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }
    
    const data = docSnap.data();
    return {
      escolaId: docSnap.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    } as Escola;
  } catch (error) {
    console.error('Erro ao buscar escola:', error);
    return null;
  }
};

// Funções para Alunos
export const createAluno = async (alunoData: Omit<Aluno, 'alunoId' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  if (!auth.currentUser) {
    throw new Error('Usuário não autenticado');
  }

  try {
    const batch = writeBatch(db);
    
    // Criar documento do aluno
    const alunoRef = doc(collection(db, 'alunos'));
    batch.set(alunoRef, {
      ...alunoData,
      professorId: auth.currentUser.uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // Atualizar estatísticas do professor
    const userRef = doc(db, 'users', auth.currentUser.uid);
    batch.update(userRef, {
      'estatisticas.totalAlunos': increment(1),
      updatedAt: serverTimestamp(),
    });

    await batch.commit();
    return alunoRef.id;
  } catch (error) {
    console.error('Erro ao criar aluno:', error);
    throw new Error('Erro ao criar aluno');
  }
};

export const getAlunos = async (professorId?: string): Promise<Aluno[]> => {
  const userId = professorId || auth.currentUser?.uid;
  if (!userId) {
    throw new Error('ID do professor não fornecido');
  }

  try {
    const q = query(
      collection(db, 'alunos'),
      where('professorId', '==', userId),
      where('ativo', '==', true),
      orderBy('dadosPessoais.nome')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      alunoId: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      estatisticas: {
        ...doc.data().estatisticas,
        ultimoRelatorio: doc.data().estatisticas?.ultimoRelatorio?.toDate(),
      },
    })) as Aluno[];
  } catch (error) {
    console.error('Erro ao buscar alunos:', error);
    throw new Error('Erro ao buscar alunos');
  }
};

export const getAluno = async (alunoId: string): Promise<Aluno | null> => {
  try {
    const docRef = doc(db, 'alunos', alunoId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }
    
    // Verificar se o aluno pertence ao professor atual
    const data = docSnap.data();
    if (auth.currentUser && data.professorId !== auth.currentUser.uid) {
      throw new Error('Acesso negado');
    }
    
    return {
      alunoId: docSnap.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
      estatisticas: {
        ...data.estatisticas,
        ultimoRelatorio: data.estatisticas?.ultimoRelatorio?.toDate(),
      },
    } as Aluno;
  } catch (error) {
    console.error('Erro ao buscar aluno:', error);
    return null;
  }
};

export const updateAluno = async (alunoId: string, updateData: Partial<Omit<Aluno, 'alunoId' | 'createdAt' | 'updatedAt'>>): Promise<void> => {
  if (!auth.currentUser) {
    throw new Error('Usuário não autenticado');
  }

  try {
    const docRef = doc(db, 'alunos', alunoId);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Erro ao atualizar aluno:', error);
    throw new Error('Erro ao atualizar aluno');
  }
};

export const deleteAluno = async (alunoId: string): Promise<void> => {
  if (!auth.currentUser) {
    throw new Error('Usuário não autenticado');
  }

  try {
    const batch = writeBatch(db);
    
    // Marcar aluno como inativo ao invés de deletar
    const alunoRef = doc(db, 'alunos', alunoId);
    batch.update(alunoRef, {
      ativo: false,
      updatedAt: serverTimestamp(),
    });

    // Atualizar estatísticas do professor
    const userRef = doc(db, 'users', auth.currentUser.uid);
    batch.update(userRef, {
      'estatisticas.totalAlunos': increment(-1),
      updatedAt: serverTimestamp(),
    });

    await batch.commit();
  } catch (error) {
    console.error('Erro ao deletar aluno:', error);
    throw new Error('Erro ao deletar aluno');
  }
};

// Funções para Relatórios
export const createRelatorio = async (relatorioData: Omit<Relatorio, 'relatorioId' | 'createdAt' | 'updatedAt' | 'historico'>): Promise<string> => {
  if (!auth.currentUser) {
    throw new Error('Usuário não autenticado');
  }

  try {
    const batch = writeBatch(db);
    
    // Criar documento do relatório
    const relatorioRef = doc(collection(db, 'relatorios'));
    batch.set(relatorioRef, {
      ...relatorioData,
      professorId: auth.currentUser.uid,
      historico: [
        {
          acao: 'criado',
          data: serverTimestamp(),
          usuario: auth.currentUser.uid,
        },
      ],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // Atualizar estatísticas do professor
    const userRef = doc(db, 'users', auth.currentUser.uid);
    batch.update(userRef, {
      'estatisticas.totalRelatorios': increment(1),
      updatedAt: serverTimestamp(),
    });

    // Atualizar estatísticas do aluno
    const alunoRef = doc(db, 'alunos', relatorioData.alunoId);
    batch.update(alunoRef, {
      'estatisticas.totalRelatorios': increment(1),
      'estatisticas.ultimoRelatorio': serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    await batch.commit();
    return relatorioRef.id;
  } catch (error) {
    console.error('Erro ao criar relatório:', error);
    throw new Error('Erro ao criar relatório');
  }
};

export const getRelatorios = async (professorId?: string, alunoId?: string): Promise<Relatorio[]> => {
  const userId = professorId || auth.currentUser?.uid;
  if (!userId) {
    throw new Error('ID do professor não fornecido');
  }

  try {
    const constraints: QueryConstraint[] = [
      where('professorId', '==', userId),
      orderBy('createdAt', 'desc'),
    ];

    if (alunoId) {
      constraints.splice(1, 0, where('alunoId', '==', alunoId));
    }

    const q = query(collection(db, 'relatorios'), ...constraints);
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        relatorioId: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        historico: data.historico?.map((h: any) => ({
          ...h,
          data: h.data?.toDate() || new Date(),
        })) || [],
        compartilhamento: data.compartilhamento ? {
          ...data.compartilhamento,
          compartilhadoCom: data.compartilhamento.compartilhadoCom?.map((c: any) => ({
            ...c,
            data: c.data?.toDate() || new Date(),
          })) || [],
        } : undefined,
      };
    }) as Relatorio[];
  } catch (error) {
    console.error('Erro ao buscar relatórios:', error);
    throw new Error('Erro ao buscar relatórios');
  }
};

export const getRelatorio = async (relatorioId: string): Promise<Relatorio | null> => {
  try {
    const docRef = doc(db, 'relatorios', relatorioId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }
    
    // Verificar se o relatório pertence ao professor atual
    const data = docSnap.data();
    if (auth.currentUser && data.professorId !== auth.currentUser.uid) {
      throw new Error('Acesso negado');
    }
    
    return {
      relatorioId: docSnap.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
      historico: data.historico?.map((h: any) => ({
        ...h,
        data: h.data?.toDate() || new Date(),
      })) || [],
      compartilhamento: data.compartilhamento ? {
        ...data.compartilhamento,
        compartilhadoCom: data.compartilhamento.compartilhadoCom?.map((c: any) => ({
          ...c,
          data: c.data?.toDate() || new Date(),
        })) || [],
      } : undefined,
    } as Relatorio;
  } catch (error) {
    console.error('Erro ao buscar relatório:', error);
    return null;
  }
};

export const updateRelatorio = async (
  relatorioId: string,
  updateData: Partial<Omit<Relatorio, 'relatorioId' | 'createdAt' | 'updatedAt' | 'historico'>>
): Promise<void> => {
  if (!auth.currentUser) {
    throw new Error('Usuário não autenticado');
  }

  try {
    const docRef = doc(db, 'relatorios', relatorioId);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: serverTimestamp(),
      historico: arrayUnion({
        acao: 'editado',
        data: serverTimestamp(),
        usuario: auth.currentUser.uid,
      }),
    });
  } catch (error) {
    console.error('Erro ao atualizar relatório:', error);
    throw new Error('Erro ao atualizar relatório');
  }
};

// Função para buscar estatísticas do dashboard
export const getDashboardStats = async (): Promise<{
  totalAlunos: number;
  totalRelatorios: number;
  relatoriosRecentes: Relatorio[];
}> => {
  if (!auth.currentUser) {
    throw new Error('Usuário não autenticado');
  }

  try {
    // Buscar estatísticas do usuário
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    // Buscar relatórios recentes
    const relatoriosRecentesQuery = query(
      collection(db, 'relatorios'),
      where('professorId', '==', auth.currentUser.uid),
      orderBy('createdAt', 'desc'),
      limit(5)
    );

    const relatoriosSnap = await getDocs(relatoriosRecentesQuery);
    const relatoriosRecentes = relatoriosSnap.docs.map(doc => {
      const data = doc.data();
      return {
        relatorioId: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      };
    }) as Relatorio[];

    return {
      totalAlunos: userData?.estatisticas?.totalAlunos || 0,
      totalRelatorios: userData?.estatisticas?.totalRelatorios || 0,
      relatoriosRecentes,
    };
  } catch (error) {
    console.error('Erro ao buscar estatísticas do dashboard:', error);
    throw new Error('Erro ao buscar estatísticas');
  }
};