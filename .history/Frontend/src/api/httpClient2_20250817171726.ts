//Algoritmo de base para requisições com axios - NOVA VERSÃO

import axios from 'axios';

// Configuração da API com base URL correta - FORÇANDO NOVA VERSÃO
export const api = axios.create({
  baseURL: 'http://localhost:3000/api', // URL FIXA PARA QUEBRAR CACHE
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar automaticamente o token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
