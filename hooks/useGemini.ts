// hooks/useGemini.ts (Versão Simplificada)
import { useState } from 'react';
import { StudentData, IncidentData, AIResponse, GeminiHookReturn } from '../types';

export function useGemini(): GeminiHookReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateReport = async (
    studentData: StudentData, 
    incidentData: IncidentData, 
    additionalContext: string = ''
  ): Promise<AIResponse> => {
    setLoading(true);
    setError(null);

    try {
      const prompt = `
Como especialista em psicologia educacional, analise o seguinte caso e gere um relatório comportamental estruturado:

**DADOS DO ALUNO:**
- Nome: ${studentData.name}
- Idade: ${studentData.age || 'Não informada'}
- Série/Turma: ${studentData.class}
- Histórico comportamental: ${studentData.behaviorHistory || 'Primeiro registro'}

**OCORRÊNCIA:**
- Data: ${incidentData.date}
- Local: ${incidentData.location}
- Descrição: ${incidentData.description}
- Contexto: ${incidentData.context || ''}
- Pessoas envolvidas: ${incidentData.peopleInvolved || 'Não especificado'}
- Gravidade: ${incidentData.severity}

**CONTEXTO ADICIONAL:**
${additionalContext}

**INSTRUÇÕES:**
Gere um relatório profissional com:

1. **RESUMO EXECUTIVO** (2-3 linhas)
2. **ANÁLISE COMPORTAMENTAL** 
   - Possíveis fatores contribuintes
   - Padrões identificados
3. **IMPACTO NO AMBIENTE ESCOLAR**
4. **RECOMENDAÇÕES IMEDIATAS**
   - Ações para o professor
   - Ações para a coordenação
5. **ESTRATÉGIAS DE INTERVENÇÃO A LONGO PRAZO**
6. **SUGESTÕES DE ACOMPANHAMENTO**

Use linguagem profissional, empática e construtiva. Foque em soluções e desenvolvimento positivo do aluno.
      `;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Erro ao gerar relatório';

      return {
        report: text,
        timestamp: new Date().toISOString(),
        model: 'gemini-1.5-flash',
        promptTokens: prompt.length,
      };

    } catch (err) {
      console.error('Erro ao gerar relatório:', err);
      const errorMessage = 'Erro ao gerar relatório. Verifique sua API key do Gemini.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const generateQuickAnalysis = async (behaviorDescription: string): Promise<string> => {
    setLoading(true);
    setError(null);

    try {
      const prompt = `
Analise rapidamente este comportamento escolar e forneça:

**COMPORTAMENTO:** ${behaviorDescription}

Responda em formato conciso:

**CLASSIFICAÇÃO:** (Leve/Moderado/Grave)
**POSSÍVEIS CAUSAS:** (3 principais)
**AÇÃO IMEDIATA:** (1 sugestão prática)
**NECESSITA ACOMPANHAMENTO:** (Sim/Não + justificativa)

Seja objetivo e profissional.
      `;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Erro na análise';

    } catch (err) {
      console.error('Erro na análise rápida:', err);
      const errorMessage = 'Erro na análise. Verifique sua API key do Gemini.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const clearError = (): void => {
    setError(null);
  };

  return {
    generateReport,
    generateQuickAnalysis,
    loading,
    error,
    clearError
  };
}