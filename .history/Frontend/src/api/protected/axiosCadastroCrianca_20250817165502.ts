//Algoritmo que faz ligação do frontend e backend do cadastro de criança.

import { api } from "../httpClient";

// Interface para tipagem dos dados de cadastro de criança baseada no layout do frontend
export interface CadastroCriancaFormData {
  // Informações Básicas
  nomeCompleto: string;
  idade: number;
  dataNascimento: string; // formato: "YYYY-MM-DD"
  genero: 'Masculino' | 'Feminino' | 'Outro' | 'Prefiro não informar';
  diagnostico: string;
  diagnosticoOutro?: string; // Campo condicional quando diagnostico === 'Outro'
  
  // Informações do Responsável
  nomeResponsavel: string;
  telefone: string;
  email?: string; // opcional
  endereco?: string; // opcional
  
  // Informações Adicionais
  observacoes?: string; // opcional
}

// Interface para os dados que serão enviados para a API (compatível com backend)
export interface CadastroCriancaApiRequest {
  // Dados da criança (nomes ajustados para compatibilidade com backend)
  fullName: string;           // Nome Completo
  age?: number;              // Idade (opcional, calculada automaticamente pelo backend)
  birthDate: string;         // Data de Nascimento no formato dd/mm/aaaa
  gender: "Masculino" | "Feminino" | "Outro";  // Gênero
  diagnosis: string;         // Diagnóstico final (já processado)
  notes?: string;            // Observações
  
  // Dados do responsável (se não existir, será criado)
  responsible: {
    name: string;            // Nome do Responsável
    phone: string;           // Telefone (obrigatório)
    email?: string;          // E-mail (opcional)
    address?: string;        // Endereço (opcional)
  };
}

// Interface para a resposta da API ao cadastrar criança
export interface CadastroCriancaApiResponse {
  success: boolean;
  message: string;
  data?: {
    crianca: {
      id: number;
      nome: string;
      data_nascimento: string;
      idade: number;
      genero: string;
      diagnostico: string;
      observacoes?: string;
      responsavel_id: number;
    };
    responsavel?: {
      id: number;
      name: string;
      telefone?: string;
      email?: string;
      endereco?: string;
    };
  };
}

// Interface para os dados de uma criança retornada pela API (listagem)
export interface CriancaListagem {
  id: number;
  nome: string;
  idade: number;
  genero: string;
  diagnostico: string;
  observacoes?: string;
  data_nascimento: string;
  responsavel: {
    id: number;
    nome: string;
    email?: string;
    telefone?: string;
    endereco?: string;
  };
}

// Interface para resposta da API de listagem de crianças
export interface ListagemCriancasApiResponse {
  success: boolean;
  message: string;
  data: {
    criancas: CriancaListagem[];
    total: number;
  };
}

export const cadastrarCrianca = async (data: CadastroCriancaFormData): Promise<CadastroCriancaApiResponse> => {
  const requestData: CadastroCriancaApiRequest = {
    nome: data.nomeCompleto,
    data_nascimento: data.dataNascimento,
    idade: data.idade,
    genero: data.genero,
    diagnostico: data.diagnostico === 'Outro' ? data.diagnosticoOutro || '' : data.diagnostico,
    observacoes: data.observacoes,
    responsavel: {
      nome: data.nomeResponsavel,
      telefone: data.telefone,
      email: data.email,
      endereco: data.endereco
    }
  };

  try {
    const response = await api.post<CadastroCriancaApiResponse>('/private/criancas', requestData);
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar criança:', error);
    throw error;
  }
};