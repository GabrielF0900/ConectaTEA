// src/pages/Profissionais.tsx

import { useState } from "react";
import { Search, Bell, User, Filter } from "lucide-react";

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
    <div className="p-4 md:p-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex items-center w-full md:w-1/2 gap-2">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex items-center gap-4">
          <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
          <div className="flex items-center gap-2">
            <User className="w-8 h-8 rounded-full bg-gray-200 p-1" />
            <div className="hidden sm:flex flex-col text-right">
              <span className="font-semibold">Dr. Maria Silva</span>
              <span className="text-xs bg-green-100 text-green-600 rounded px-2">
                Profissional
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Título e Ações */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Profissionais</h1>
          <p className="text-gray-600">
            Gerencie os profissionais cadastrados no sistema
          </p>
        </div>
        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow">
          + Novo Profissional
        </button>
      </div>

      {/* Barra de Busca e Filtros */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Buscar profissionais..."
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button className="flex items-center gap-2 border px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100">
          <Filter className="w-4 h-4" />
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
