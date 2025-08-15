//Nesse algoritmo eu irei desenvolver as ligações com frontend e backend no que se refere ao login, registro, logout.

// authApi.ts
import { api } from "./httpClient";

// Tipagem opcional do retorno do login
interface AuthResponse {
  token: string;
  user: {
    id: number;
    nome: string;
    email: string;
    tipoUsuario: string;
  };
}

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post<AuthResponse>("/api/login", { email, password });
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
    const response = await api.post("/auth/register", {
      nome,
      email,
      senha,
      tipoUsuario,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    throw error;
  }
};
