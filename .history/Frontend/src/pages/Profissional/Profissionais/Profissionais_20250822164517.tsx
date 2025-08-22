// src/pages/Profissionais.tsx

import { useState } from "react";
import { Search, UserPlus, Bell, Settings, Eye, Edit } from "lucide-react";

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
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="bg-white border-b px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Profissionais</h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Rede de profissionais da plataforma
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Barra de pesquisa */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar profissionais..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
            />
          </div>
          {/* Botão Novo Profissional */}
          <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-3 sm:px-4 py-2 rounded-lg shadow text-sm sm:text-base">
            <UserPlus className="h-4 w-4" />
            <span className="hidden sm:inline">Novo Profissional</span>
          </button>
          {/* Notificações */}
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Bell className="w-6 h-6" />
          </button>
          {/* Usuário logado */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm sm:text-base">Dr. Maria Silva</span>
            <span className="text-xs bg-green-100 text-green-600 rounded px-2 py-1">
              Profissional
            </span>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
        {/* Filtros */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base">
            <Settings className="h-4 w-4" />
            Filtros
          </button>
        </div>

        {/* Lista responsiva de Profissionais */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profissionais.map((prof) => (
            <div
              key={prof.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                <h2 className="text-lg font-bold flex flex-wrap items-center gap-2 mb-2">
                  {prof.nome}
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-lg">
                    {prof.especialidade}
                  </span>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-lg">
                    Ativo
                  </span>
                </h2>
                <p className="text-gray-600 text-sm">{prof.email}</p>
                <p className="text-gray-600 text-sm mb-3">{prof.telefone}</p>

                <div className="text-sm text-gray-700 space-y-1">
                  <p>
                    <span className="font-medium">Crianças atendidas:</span>{" "}
                    {prof.criancasAtendidas}
                  </p>
                  <p>
                    <span className="font-medium">Data de ingresso:</span>{" "}
                    {prof.dataIngresso}
                  </p>
                  <p className="font-medium">Crianças atuais:</p>
                  <div className="flex flex-wrap gap-2">
                    {prof.criancas.map((crianca, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-gray-100 rounded-lg text-xs"
                      >
                        {crianca}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm">
                  <Eye className="h-4 w-4" />
                  Ver
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm">
                  <Edit className="h-4 w-4" />
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
