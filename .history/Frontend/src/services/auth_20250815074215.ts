import axios from "axios";

export async function login(email: string, senha: string) {
  const response = await axios.post("http://localhost:3000/api/login", {
    email,
    password: senha,
  });
  return response.data;
}
