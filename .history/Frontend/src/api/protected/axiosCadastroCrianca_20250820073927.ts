//Algoritmo que faz ligação do frontend e backend do cadastro de criança.

import { api } from "../apiClient"; // NOVO ARQUIVO PARA QUEBRAR CACHE

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
  parentesco: 'PAI' | 'MAE' | 'AVO' | 'AVOA' | 'TIO' | 'TIA' | 'TUTOR' | 'OUTRO'; // Relação com a criança
  
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

// Interface para a resposta da API ao cadastrar criança (compatível com backend)
export interface CadastroCriancaApiResponse {
  message: string;
  crianca: {
    id: number;
    nome: string;
    idade: number;
    data_nascimento: string; // retorna como dd/mm/aaaa do backend
    genero: string;
    diagnostico: string;
    observacoes?: string;
    responsavel: {
      id: number;
      nome: string;
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
  diagnostico: string;
  observacoes?: string;
  responsavelId: number;
  responsavel: {
    nome: string; // Backend retorna 'name' mas mapeia para 'nome'
    email?: string;
    telefone?: string;
  };
}

// Interface para resposta da API de listagem de crianças
export interface ListagemCriancasApiResponse {
  message: string;
  criancas: CriancaListagem[];
  total: number;
}

// Função para converter data do formato YYYY-MM-DD para dd/mm/aaaa
const formatDateToBR = (dateStr: string): string => {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
};

// Função para mapear gênero do frontend para backend (filtrar "Prefiro não informar")
const mapGenderToBackend = (gender: string): "Masculino" | "Feminino" | "Outro" => {
  if (gender === 'Prefiro não informar') {
    return 'Outro'; // Backend não aceita "Prefiro não informar", mapeia para "Outro"
  }
  return gender as "Masculino" | "Feminino" | "Outro";
};

export const cadastrarCrianca = async (data: CadastroCriancaFormData): Promise<CadastroCriancaApiResponse> => {
  // Processar diagnóstico final
  const diagnosticoFinal = data.diagnostico === 'Outro' ? (data.diagnosticoOutro || '') : data.diagnostico;
  
  const requestData: CadastroCriancaApiRequest = {
    fullName: data.nomeCompleto,
    birthDate: formatDateToBR(data.dataNascimento), // converter YYYY-MM-DD para dd/mm/aaaa
    age: data.idade, // opcional, backend calcula automaticamente
    gender: mapGenderToBackend(data.genero),
    diagnosis: diagnosticoFinal,
    notes: data.observacoes,
    responsible: {
      name: data.nomeResponsavel,
      phone: data.telefone,
      email: data.email,
      address: data.endereco
    }
  };

  try {
    // Usar a rota correta do backend - VERSÃO ATUALIZADA
    const response = await api.post<CadastroCriancaApiResponse>('/private/cadastrar-crianca', requestData);
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar criança:', error);
    throw error;
  }
};

// Função para listar crianças (para profissionais) - VERSÃO ATUALIZADA
export const listarCriancas = async (): Promise<ListagemCriancasApiResponse> => {
  try {
    const response = await api.get<ListagemCriancasApiResponse>('/private/profissional/criancas');
    return response.data;
  } catch (error) {
    console.error('Erro ao listar crianças:', error);
    throw error;
  }
};