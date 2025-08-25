import { api } from "../apiClient";
import { Profissional } from "./axiosProfissionais";

function extractErrorMessage(e: unknown): string {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const err: any = e;
	if (err?.response?.data?.error) return String(err.response.data.error);
	if (err?.response?.data?.message) return String(err.response.data.message);
	if (err?.message) return String(err.message);
	return "Erro desconhecido";
}

// Busca o perfil do profissional pelo id do usuário logado
export async function obterPerfilProfissional(usuarioId: number): Promise<Profissional | null> {
	try {
		const { data } = await api.get<Profissional[]>(`/private/profissionais?usuarioId=${encodeURIComponent(usuarioId)}`);
		return Array.isArray(data) && data.length > 0 ? data[0] : null;
	} catch (e) {
		throw new Error(extractErrorMessage(e));
	}
}

// Atualiza o perfil do profissional
export async function atualizarPerfilProfissional(usuarioId: number, payload: Partial<Profissional>): Promise<any> {
	try {
		const { data } = await api.put(`/private/atualizar-perfil/${encodeURIComponent(usuarioId)}`, payload);
		return data;
	} catch (e) {
		throw new Error(extractErrorMessage(e));
	}
}
