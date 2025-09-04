//Nesse algoritmo eu irei desenvolver as ligações com frontend e backend no que se refere ao login, registro, logout.

// authApi.ts
import { api } from "./apiClient"; // NOVO ARQUIVO PARA QUEBRAR CACHE DEFINITIVAMENTE

// Tipagem opcional do retorno do login
interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;  // O backend retorna 'name', não 'nome'
    email: string;
    tipo: string;  // O backend retorna 'tipo', não 'tipoUsuario'
  };
}

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post<AuthResponse>("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
};

export const register = async (
  nome: string,
  email: string,
  senha: string,
  tipoUsuario: string
) => {
  try {
    const response = await api.post("/register", {
      name: nome,
      email,
      password: senha,
      tipo: tipoUsuario,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    throw error;
  }
};
