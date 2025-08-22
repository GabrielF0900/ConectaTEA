// src/pages/Profissionais.tsx
import { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  MessageSquare,
  Linkedin,
  Instagram,
  Facebook,
} from "lucide-react";

export default function Profissionais() {
  const [abaAtiva, setAbaAtiva] = useState<"todos" | "conexoes">("todos");

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
      locais: [{ nome: "Clínica Fala & Vida", cidade: "São Paulo - SP" }],
      redes: ["linkedin", "facebook"],
      areas: ["Comunicação Alternativa", "PECS", "Desenvolvimento da Linguagem", "+1"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fb] py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Profissionais</h1>
          <p className="text-gray-500 mt-1">Conecte-se com outros profissionais de saúde</p>
        </div>

        {/* Abas */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <button
            onClick={() => setAbaAtiva("todos")}
            className={`px-5 py-2 rounded-lg font-semibold text-sm transition border ${
              abaAtiva === "todos"
                ? "bg-green-500 text-white border-green-500"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            Todos os Profissionais
          </button>
          <button
            onClick={() => setAbaAtiva("conexoes")}
            className={`px-5 py-2 rounded-lg font-semibold text-sm transition border ${
              abaAtiva === "conexoes"
                ? "bg-green-500 text-white border-green-500"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            Minhas Conexões (2)
          </button>
        </div>

        {/* Barra de busca e filtros */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar profissionais..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
            />
          </div>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 text-sm font-medium">
              <Filter className="h-4 w-4" />
              Filtros
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm font-medium">
              + Adicionar
            </button>
          </div>
        </div>

        {/* Cards dos profissionais */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {profissionais.map((prof) => (
            <div
              key={prof.id}
              className="bg-white rounded-2xl border border-gray-200 shadow p-6 flex flex-col min-h-[380px]"
            >
              <div className="flex flex-col gap-2 mb-2">
                <span className="text-lg font-bold text-gray-900">{prof.nome}</span>
                <div className="flex gap-2 items-center flex-wrap">
                  <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded">
                    {prof.especialidade}
                  </span>
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded">
                    {prof.status}
                  </span>
                </div>
              </div>

              <div className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">Código de Identificação:</span>
                <br />
                <span className="font-mono font-bold text-gray-900">{prof.codigo}</span>
              </div>

              <div className="mb-2">
                <span className="font-semibold text-sm text-gray-700">Locais de atendimento:</span>
                <ul className="mt-1">
                  {prof.locais.map((local, idx) => (
                    <li key={idx} className="flex items-center gap-1 text-gray-800 text-sm">
                      <span className="inline-block w-4 h-4 text-blue-500">📍</span>
                      <span className="font-medium">{local.nome}</span>
                      <span className="text-xs text-gray-500 ml-auto">{local.cidade}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-2">
                <span className="font-semibold text-sm text-gray-700">Redes sociais:</span>
                <div className="flex gap-2 mt-1">
                  {prof.redes.includes("linkedin") && <Linkedin className="w-5 h-5 text-blue-700" />}
                  {prof.redes.includes("instagram") && <Instagram className="w-5 h-5 text-pink-500" />}
                  {prof.redes.includes("facebook") && <Facebook className="w-5 h-5 text-blue-600" />}
                </div>
              </div>

              <div className="mb-4">
                <span className="font-semibold text-sm text-gray-700">Áreas de atuação:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {prof.areas.map((area, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full border border-gray-200"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mt-auto">
                <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-sm font-medium">
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
