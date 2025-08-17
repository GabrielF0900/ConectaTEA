// src/routes.tsx
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login.tsx";
import Register from "../pages/Register.tsx";
import Home from "../pages/Home.tsx";
import Dashboard from "../pages/Profissional/Dashboard/Dashboard.tsx";
import ProtectedRoute from "../components/ProtectedRoute.tsx";
import Criancas from "../pages/Profissional/Criancas/Criancas.tsx";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Rotas do Profissional */}
      <Route
        path="/profissional/dashboard"
        element={
          <ProtectedRoute requiredUserType="PROFISSIONAL">
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profissional/criancas"
        element={
          <ProtectedRoute requiredUserType="PROFISSIONAL">
            <Criancas />
          </ProtectedRoute>
        }
      />

      {/* Rotas do Responsável */}
      <Route
        path="/responsavel/dashboard"
        element={
          <ProtectedRoute requiredUserType="RESPONSAVEL">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Rota de compatibilidade - redireciona baseado no tipo de usuário */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

// src/pages/Profissional/Criancas/Criancas.tsx
import { useState, useEffect } from 'react';

interface Crianca {
  id: number;
  nome: string;
  idade: number;
  genero: string;
  diagnostico: string;
  responsavel: {
    nome: string;
    telefone: string;
    email?: string;
  };
}

export default function Criancas() {
  const [criancas, setCriancas] = useState<Crianca[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Implementar busca de crianças da API
    // Por enquanto, dados mockados
    const mockCriancas: Crianca[] = [
      {
        id: 1,
        nome: "Ana Silva",
        idade: 6,
        genero: "Feminino",
        diagnostico: "TEA Leve",
        responsavel: {
          nome: "Maria Silva",
          telefone: "(11) 99999-9999",
          email: "maria@email.com"
        }
      },
      {
        id: 2,
        nome: "João Pedro",
        idade: 8,
        genero: "Masculino",
        diagnostico: "TEA Moderado",
        responsavel: {
          nome: "Carlos Lima",
          telefone: "(11) 88888-8888",
          email: "carlos@email.com"
        }
      }
    ];
    
    setTimeout(() => {
      setCriancas(mockCriancas);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Crianças</h1>
        <p className="text-gray-600">Gerencie as crianças cadastradas</p>
      </div>

      {/* Botão Adicionar */}
      <div className="mb-6">
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Adicionar Criança
        </button>
      </div>

      {/* Lista de Crianças */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Lista de Crianças ({criancas.length})</h2>
        </div>
        
        <div className="divide-y">
          {criancas.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-7.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <p className="text-lg font-medium">Nenhuma criança cadastrada</p>
              <p className="text-sm">Clique em "Adicionar Criança" para começar</p>
            </div>
          ) : (
            criancas.map((crianca) => (
              <div key={crianca.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{crianca.nome}</h3>
                      <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                        {crianca.idade} anos
                      </span>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                        {crianca.genero}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-2">
                      <span className="font-medium">Diagnóstico:</span> {crianca.diagnostico}
                    </p>
                    
                    <div className="text-sm text-gray-500">
                      <p><span className="font-medium">Responsável:</span> {crianca.responsavel.nome}</p>
                      <p><span className="font-medium">Telefone:</span> {crianca.responsavel.telefone}</p>
                      {crianca.responsavel.email && (
                        <p><span className="font-medium">Email:</span> {crianca.responsavel.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
