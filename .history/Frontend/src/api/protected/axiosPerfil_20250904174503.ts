import { api } from "../apiClient";
import type { Profissional } from "./axiosProfissionais";

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
		// Primeiro tenta buscar o profissional
		const { data } = await api.get<Profissional[]>(`/profissionais?usuarioId=${encodeURIComponent(usuarioId)}`);
		if (Array.isArray(data) && data.length > 0) {
			return data[0];
		}

		// Se não encontrou profissional, busca os dados básicos do usuário
		const { data: userData } = await api.get<{ message: string; data: { id: number; name: string; email?: string; telefone?: string; endereco?: string; tipo: string } }>(`/users/${usuarioId}`);
		if (userData.data) {
			// Cria um perfil básico com os dados do usuário
			return {
				id: 0, // ID temporário pois não existe profissional ainda
				usuario_id: userData.data.id,
				nome: userData.data.name,
				email: userData.data.email,
				telefone: userData.data.telefone,
				especialidade: "Não informado",
				registro_profissional: "Não informado",
				titulo: "Profissional",
				formacaoAcademica: "Não informado",
				sobre: "Perfil ainda não completado",
				fotoPerfilUrl: undefined,
				codigoIdentificacao: undefined,
				locais: [],
				redesSociais: [],
			};
		}

		return null;
	} catch (e) {
		throw new Error(extractErrorMessage(e));
	}
}

// Atualiza o perfil do profissional
export async function atualizarPerfilProfissional(usuarioId: number, payload: Partial<Profissional>): Promise<Profissional> {
	try {
		const { data } = await api.put<{ message: string; data: Profissional }>(`/users/${encodeURIComponent(usuarioId)}`, payload);
		return data.data;
	} catch (e) {
		throw new Error(extractErrorMessage(e));
	}
}
