// Cliente axios para ações de amizade (conexões profissionais)

import { api } from "../apiClient";

export type StatusConexao = "PENDENTE" | "ACEITO" | "RECUSADO";

export interface ConexaoProfissional {
  id: number;
  solicitante_id: number; // profissional.id do solicitante
  solicitado_id: number; // profissional.id do solicitado
  status: StatusConexao;
  criado_em?: string;
}

function extractErrorMessage(e: unknown): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const err: any = e;
  if (err?.response?.data?.error) return String(err.response.data.error);
  if (err?.response?.data?.message) return String(err.response.data.message);
  if (err?.message) return String(err.message);
  return "Erro desconhecido";
}

// Envia uma solicitação (usa user ids -> backend fará a conversão para profissional.id internamente)
export async function enviarSolicitacao(solicitanteId: number, solicitadoId: number, options?: { tipo?: 'user' | 'prof' }): Promise<ConexaoProfissional> {
  try {
    const body: any = {};
    if (options?.tipo === 'prof') {
      body.solicitanteProfId = solicitanteId;
      body.solicitadoProfId = solicitadoId;
    } else {
      body.solicitanteId = solicitanteId;
      body.solicitadoId = solicitadoId;
    }
    const { data } = await api.post<ConexaoProfissional>("/private/solicitacoes", body);
    return data;
  } catch (e) {
    throw new Error(extractErrorMessage(e));
  }
}

// Aceita uma solicitação existente (body usa user ids conforme implementação do backend)
export async function aceitarSolicitacao(solicitanteId: number, solicitadoId: number, options?: { tipo?: 'user' | 'prof' }): Promise<ConexaoProfissional> {
  try {
    const body: any = {};
    if (options?.tipo === 'prof') {
      body.solicitanteProfId = solicitanteId;
      body.solicitadoProfId = solicitadoId;
    } else {
      body.solicitanteId = solicitanteId;
      body.solicitadoId = solicitadoId;
    }
    const { data } = await api.put<ConexaoProfissional>("/private/solicitacoes", body);
    return data;
  } catch (e) {
    throw new Error(extractErrorMessage(e));
  }
}

// Remove (cancela) uma solicitação — envia dados no body do DELETE
export async function removerSolicitacao(solicitanteId: number, solicitadoId: number, options?: { tipo?: 'user' | 'prof' }): Promise<void> {
  try {
    const data: any = {};
    if (options?.tipo === 'prof') {
      data.solicitanteProfId = solicitanteId;
      data.solicitadoProfId = solicitadoId;
    } else {
      data.solicitanteId = solicitanteId;
      data.solicitadoId = solicitadoId;
    }
    await api.delete("/private/solicitacoes", { data });
  } catch (e) {
    throw new Error(extractErrorMessage(e));
  }
}

// Listar solicitações enviadas por um usuário (backend pode retornar via usuarioId)
export async function listarSolicitacoesEnviadas(usuarioId: number): Promise<ConexaoProfissional[]> {
  try {
  const { data } = await api.get<ConexaoProfissional[]>(`/private/solicitacoes/enviadas?usuarioId=${encodeURIComponent(usuarioId)}`);
    return data;
  } catch (e) {
    throw new Error(extractErrorMessage(e));
  }
}

// Listar solicitações recebidas por um usuário
export async function listarSolicitacoesRecebidas(usuarioId: number): Promise<ConexaoProfissional[]> {
  try {
  const { data } = await api.get<ConexaoProfissional[]>(`/private/solicitacoes/recebidas?usuarioId=${encodeURIComponent(usuarioId)}`);
    return data;
  } catch (e) {
    throw new Error(extractErrorMessage(e));
  }
}

// Listar conexões (aceitas) de um profissional (por profissional.id)
export async function listarConexoesPorProfissional(profissionalId: number): Promise<ConexaoProfissional[]> {
  try {
  const { data } = await api.get<ConexaoProfissional[]>(`/private/conexoes?profissionalId=${encodeURIComponent(profissionalId)}`);
    return data;
  } catch (e) {
    throw new Error(extractErrorMessage(e));
  }
}

// Helper: obter conexão específica (por ids de profissional)
export async function obterConexaoPorProfissionais(solicitanteProfId: number, solicitadoProfId: number): Promise<ConexaoProfissional | null> {
  try {
  const { data } = await api.get<ConexaoProfissional[]>(`/private/solicitacoes?solicitanteProfId=${encodeURIComponent(solicitanteProfId)}&solicitadoProfId=${encodeURIComponent(solicitadoProfId)}`);
    return Array.isArray(data) && data.length ? data[0] : null;
  } catch (e) {
    throw new Error(extractErrorMessage(e));
  }
}
