//Nesse algoritmo eu irei desenvolver as ligações com frontend e backend no que se refere ao login, registro, logout.

import { api } from "./httpClient";

export const login = async (email: string, password: string) => {
return api.post("/auth/login", {email, password})
}

export const register = async (nome: string, email: string, senha: string, tipoUsuario: string) => {
return api.post("/auth/register", {nome, email, senha, tipoUsuario})
}

