// src/pages/Profissionais.tsx

import { useState } from "react";
// import { Search, Bell, User, Filter } from "lucide-react";

export default function Profissionais() {
  const [profissionais] = useState([
    {
      id: 1,
      nome: "Dr. João Santos",
      especialidade: "Psicólogo",
      email: "joao.santos@conectatea.com",
      telefone: "(11) 99999-1234",
      criancasAtendidas: 8,
      dataIngresso: "14/03/2023",
      criancas: ["Ana Silva", "Carlos Mendes", "Lucia Costa"],
    },
    {
      id: 2,
      nome: "Dra. Ana Lima",
      especialidade: "Fonoaudióloga",
      email: "ana.lima@conectatea.com",
      telefone: "(11) 99999-5678",
      criancasAtendidas: 5,
      dataIngresso: "10/05/2023",
      criancas: ["Pedro Souza", "Maria Alves"],
    },
  ]);

  return (
    <div className="h-full">
      {/* Header com barra de pesquisa */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Profissionais</h1>
            <p className="text-gray-500">Gerencie os profissionais cadastrados no sistema</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Barra de pesquisa */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Buscar profissionais..." 
                className="block w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            {/* Botão Novo Profissional */}
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow">
              + Novo Profissional
            </button>
            {/* Notificações */}
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v18H3V3h6z" />
              </svg>
            </button>
            {/* Usuário */}
            <div className="flex items-center gap-2">
              <span className="font-semibold">Dr. Maria Silva</span>
              <span className="text-xs bg-green-100 text-green-600 rounded px-2 py-1">
                Profissional
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="p-6">
        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <button className="flex items-center gap-2 border px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100">
            <span className="w-4 h-4">⚙️</span>
            Filtros
          </button>
        </div>

      {/* Lista de Profissionais */}
      <div className="space-y-4">
        {profissionais.map((prof) => (
          <div
            key={prof.id}
            className="bg-white rounded-2xl shadow-sm border p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
          >
            <div className="flex-1">
              <h2 className="text-lg font-bold flex items-center gap-2 mb-2">
                {prof.nome}
                <span className="text-sm bg-blue-100 text-blue-600 px-2 py-0.5 rounded-lg">
                  {prof.especialidade}
                </span>
                <span className="text-sm bg-black text-white px-2 py-0.5 rounded-lg">
                  Ativo
                </span>
              </h2>
              <p className="text-gray-600 mb-1">{prof.email}</p>
              <p className="text-gray-600 mb-2">{prof.telefone}</p>
              <div className="text-sm text-gray-700">
                <p className="mb-1">
                  Crianças atendidas:{" "}
                  <span className="font-medium">{prof.criancasAtendidas}</span>
                </p>
                <p className="mb-2">Data de ingresso: {prof.dataIngresso}</p>
                <p className="mb-1">Crianças atuais:</p>
                <div className="flex flex-wrap gap-2">
                  {prof.criancas.map((crianca, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-gray-100 rounded-lg text-sm"
                    >
                      {crianca}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2 self-end sm:self-auto">
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition-colors">
                Ver Perfil
              </button>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition-colors">
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
