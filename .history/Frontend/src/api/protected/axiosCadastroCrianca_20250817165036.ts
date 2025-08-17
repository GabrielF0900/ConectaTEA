//Algoritmo que faz ligação do frontend e backend do cadastro de criança.

import axios from "axios";
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

// Interface para os dados que serão enviados para a API
export interface CadastroCriancaApiRequest {
  // Dados da criança
  nome: string;
  data_nascimento: string;
  idade: number;
  genero: string;
  diagnostico: string;
  observacoes?: string;
  
  // Dados do responsável (se não existir, será criado)
  responsavel: {
    nome: string;
    telefone: string;
    email?: string;
    endereco?: string;
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

// Tipo original mantido para compatibilidade (DEPRECATED - usar as interfaces acima)
type CriarCrianca = {
    nome: string;
    data_nascimento: Date;
    idade: number;
    diagnostico: string;
    genero: string;
    observacoes?: string;
    responsavel_id: number;
}

export const cadastrarCrianca = async (data: CadastroCriancaFormData) {}