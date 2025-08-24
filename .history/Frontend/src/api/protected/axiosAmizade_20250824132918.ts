// Cliente axios para ações de amizade (conexões profissionais)

import { api } from "../apiClient";
import type { Profissional } from "./axiosProfissionais";

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
export async function enviarSolicitacao(solicitanteId: number, solicitadoId: number): Promise<ConexaoProfissional> {
  try {
    const { data } = await api.post<ConexaoProfissional>("/api/private/solicitacoes", {
      solicitanteId,
      solicitadoId,
    });
    return data;
  } catch (e) {
    throw new Error(extractErrorMessage(e));
  }
}

// Aceita uma solicitação existente (body usa user ids conforme implementação do backend)
export async function aceitarSolicitacao(solicitanteId: number, solicitadoId: number): Promise<ConexaoProfissional> {
  try {
    const { data } = await api.put<ConexaoProfissional>("/api/private/solicitacoes", {
      solicitanteId,
      solicitadoId,
    });
    return data;
  } catch (e) {
    throw new Error(extractErrorMessage(e));
  }
}

// Remove (cancela) uma solicitação — envia dados no body do DELETE
export async function removerSolicitacao(solicitanteId: number, solicitadoId: number): Promise<void> {
  try {
    await api.delete("/api/private/solicitacoes", { data: { solicitanteId, solicitadoId } });
  } catch (e) {
    throw new Error(extractErrorMessage(e));
  }
}

// Listar solicitações enviadas por um usuário (backend pode retornar via usuarioId)
export async function listarSolicitacoesEnviadas(usuarioId: number): Promise<ConexaoProfissional[]> {
  try {
    const { data } = await api.get<ConexaoProfissional[]>(`/api/private/solicitacoes/enviadas?usuarioId=${encodeURIComponent(usuarioId)}`);
    return data;
  } catch (e) {
    throw new Error(extractErrorMessage(e));
  }
}

// Listar solicitações recebidas por um usuário
export async function listarSolicitacoesRecebidas(usuarioId: number): Promise<ConexaoProfissional[]> {
  try {
    const { data } = await api.get<ConexaoProfissional[]>(`/api/private/solicitacoes/recebidas?usuarioId=${encodeURIComponent(usuarioId)}`);
    return data;
  } catch (e) {
    throw new Error(extractErrorMessage(e));
  }
}

// Listar conexões (aceitas) de um profissional (por profissional.id)
export async function listarConexoesPorProfissional(profissionalId: number): Promise<ConexaoProfissional[]> {
  try {
    const { data } = await api.get<ConexaoProfissional[]>(`/api/private/conexoes?profissionalId=${encodeURIComponent(profissionalId)}`);
    return data;
  } catch (e) {
    throw new Error(extractErrorMessage(e));
  }
}

// Helper: obter conexão específica (por ids de profissional)
export async function obterConexaoPorProfissionais(solicitanteProfId: number, solicitadoProfId: number): Promise<ConexaoProfissional | null> {
  try {
    const { data } = await api.get<ConexaoProfissional[]>(`/api/private/solicitacoes?solicitanteProfId=${encodeURIComponent(solicitanteProfId)}&solicitadoProfId=${encodeURIComponent(solicitadoProfId)}`);
    return Array.isArray(data) && data.length ? data[0] : null;
  } catch (e) {
    throw new Error(extractErrorMessage(e));
  }
}
