import axios from "axios";

export async function login(email: string, senha: string) {
  const response = await axios.post("http://localhost:3000/api/login", {
    email,
    password: senha,
  });
  return response.data;
}

export async function register(nome: string, email: string, senha: string, tipo: string) {
  const response = await axios.post("http://localhost:3000/api/register", {
    name: nome,
    email,
    password: senha,
    tipo: tipo.toUpperCase(),
  });
  return response.data;
}
