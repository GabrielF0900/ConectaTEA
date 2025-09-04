//Algoritmo que cuidará da ligação do frontend com backend com axios.


import { api } from "../apiClient";

export interface Profissional {
	id: number;
	usuario_id: number;
	// campos simples do profissional
	nome?: string;
	especialidade?: string;
	registro_profissional?: string;
	titulo?: string;
	formacaoAcademica?: string;
	sobre?: string;
	fotoPerfilUrl?: string;
	codigoIdentificacao?: string;

	// dados do usuário relacionado
	usuario?: {
		id: number;
		nome: string;
		email?: string | null;
		telefone?: string | null;
		endereco?: string | null;
		criado_em?: string;
	} | null;

	// relações enriquecidas
	locais?: { id: number; nome: string; cidade: string }[];
	redes?: { [tipo: string]: string | null };
	redesArray?: { id: number; tipo: string; url?: string | null }[];
	// relação direta do backend (quando incluída via include)
	redesSociais?: { id: number; tipo: string; url?: string | null }[];
	areas?: { id?: number; nome?: string }[];
	areasAtuacao?: { id?: number; nome?: string }[];

	// campos legacy/compatibilidade
	email?: string;
	telefone?: string;
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

export async function listarProfissionais(params?: { usuarioId?: number; search?: string }): Promise<Profissional[]> {
	try {
		const query: string[] = [];
		if (params?.usuarioId !== undefined) query.push(`usuarioId=${encodeURIComponent(params.usuarioId)}`);
		if (params?.search) query.push(`search=${encodeURIComponent(params.search)}`);
		const suffix = query.length ? `?${query.join("&")}` : "";
	const { data } = await api.get<Profissional[]>(`/private/profissionais${suffix}`);
		return data;
	} catch (e) {
		throw new Error(extractErrorMessage(e));
	}
}

export async function obterProfissionalPorId(id: number): Promise<Profissional> {
	try {
	const { data } = await api.get<Profissional>(`/private/profissionais/${id}`);
		return data;
	} catch (e) {
		throw new Error(extractErrorMessage(e));
	}
}

export async function obterProfissionalPorUsuarioId(usuarioId: number): Promise<Profissional | null> {
	try {
	const { data } = await api.get<Profissional[]>(`/private/profissionais?usuarioId=${encodeURIComponent(usuarioId)}`);
		return Array.isArray(data) && data.length > 0 ? data[0] : null;
	} catch (e) {
		throw new Error(extractErrorMessage(e));
	}
}

export async function atualizarPerfilUsuario(usuarioId: number, payload: Partial<Profissional>): Promise<Profissional> {
	try {
	const { data } = await api.put<Profissional>(`/private/atualizar-perfil/${encodeURIComponent(usuarioId)}`, payload);
		return data;
	} catch (e) {
		throw new Error(extractErrorMessage(e));
	}
}

