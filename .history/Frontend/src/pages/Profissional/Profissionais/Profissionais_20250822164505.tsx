// src/pages/Profissionais.tsx

import { useState } from "react";
import { Search, Filter, Eye, MessageSquare, Linkedin, Instagram, Facebook } from "lucide-react";

export default function Profissionais() {
  const [abaAtiva, setAbaAtiva] = useState<'todos' | 'conexoes'>('todos');
  // Simula usuário logado
  const usuario = { nome: 'Dr. Maria Silva', tipo: 'Profissional' };
  const profissionais = [
    {
      id: 1,
      nome: "Dr. João Santos",
      especialidade: "Psicólogo",
      status: "Ativo",
      codigo: "PROF-001",
      locais: [
        { nome: "Clínica Conecta TEA", cidade: "São Paulo - SP" },
        { nome: "Centro de Desenvolvimento Infantil", cidade: "São Paulo - SP" },
      ],
      redes: ["linkedin", "instagram"],
      areas: ["ABA", "Denver", "TEACCH", "+1"],
    },
    {
      id: 2,
      nome: "Dra. Ana Lima",
      especialidade: "Fonoaudióloga",
      status: "Ativo",
      codigo: "PROF-002",
      locais: [
        { nome: "Clínica Fala & Vida", cidade: "São Paulo - SP" },
      ],
      redes: ["linkedin", "facebook"],
      areas: ["Comunicação Alternativa", "PECS", "Desenvolvimento da Linguagem", "+1"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      {/* Header padrão ConectaTEA */}
      <header className="bg-white border-b px-4 sm:px-8 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Networking Profissional</h1>
          <p className="text-gray-500 text-base">Conecte-se com outros profissionais de saúde</p>
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
          {/* Usuário logado */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm sm:text-base">{usuario.nome}</span>
            <span className="text-xs bg-green-100 text-green-600 rounded px-2 py-1">
              {usuario.tipo}
            </span>
          </div>
        </div>
      </header>

      {/* Abas */}
      <div className="max-w-6xl mx-auto px-2 sm:px-0 mt-8">
        <div className="flex items-center mb-6">
          <div className="flex gap-2">
            <button
              className={`px-5 py-2 rounded-lg font-semibold text-sm transition border ${abaAtiva === 'todos' ? 'bg-green-500 text-white border-green-500 shadow' : 'bg-white text-gray-700 border-gray-300'}`}
              onClick={() => setAbaAtiva('todos')}
            >
              Todos os Profissionais
            </button>
            <button
              className={`px-5 py-2 rounded-lg font-semibold text-sm transition border ${abaAtiva === 'conexoes' ? 'bg-green-500 text-white border-green-500 shadow' : 'bg-white text-gray-700 border-gray-300'}`}
              onClick={() => setAbaAtiva('conexoes')}
            >
              Minhas Conexões (2)
            </button>
          </div>
          <div className="flex-1 flex justify-end">
            <button className="flex items-center gap-2 px-4 py-2 border border-green-500 rounded-lg bg-white text-green-700 hover:bg-green-50 text-sm font-medium">
              <Filter className="h-4 w-4" />
              Filtros
            </button>
          </div>
        </div>

        {/* Cards dos profissionais */}
        <div className="grid gap-6 sm:grid-cols-2">
          {profissionais.map((prof) => (
            <div
              key={prof.id}
              className="bg-white rounded-2xl border border-gray-200 shadow p-6 flex flex-col min-h-[370px]"
            >
              <div className="flex flex-col gap-2 mb-2">
                <span className="text-lg font-bold text-gray-900">{prof.nome}</span>
                <div className="flex gap-2 items-center">
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded">{prof.especialidade}</span>
                  <span className="bg-green-50 text-green-600 text-xs font-semibold px-2 py-0.5 rounded border border-green-200">{prof.status}</span>
                </div>
              </div>
              <div className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">Código de Identificação:</span><br />
                <span className="font-mono font-bold text-gray-900">{prof.codigo}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-sm text-gray-700">Locais de atendimento:</span>
                <ul className="mt-1">
                  {prof.locais.map((local, idx) => (
                    <li key={idx} className="flex items-center gap-1 text-gray-800 text-sm">
                      <span className="inline-block w-4 h-4 text-green-500">📍</span>
                      <span className="font-medium">{local.nome}</span>
                      <span className="text-xs text-gray-500">{local.cidade}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-sm text-gray-700">Redes sociais:</span>
                <div className="flex gap-2 mt-1">
                  {prof.redes.includes("linkedin") && (
                    <a href="#" className="text-blue-700 hover:opacity-80" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                  )}
                  {prof.redes.includes("instagram") && (
                    <a href="#" className="text-pink-500 hover:opacity-80" title="Instagram"><Instagram className="w-5 h-5" /></a>
                  )}
                  {prof.redes.includes("facebook") && (
                    <a href="#" className="text-blue-600 hover:opacity-80" title="Facebook"><Facebook className="w-5 h-5" /></a>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <span className="font-semibold text-sm text-gray-700">Áreas de atuação:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {prof.areas.map((area, idx) => (
                    <span key={idx} className="bg-green-50 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full border border-green-200">{area}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 mt-auto">
                <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border border-green-500 rounded-lg bg-green-500 text-white hover:bg-green-600 text-sm font-medium shadow">
                  <Eye className="h-4 w-4" />
                  Ver Perfil
                </button>
                <button className="flex items-center justify-center px-3 py-2 border border-green-500 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm font-medium">
                  <MessageSquare className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
