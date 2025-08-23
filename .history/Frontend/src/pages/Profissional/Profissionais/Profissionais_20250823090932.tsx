// src/pages/Profissionais.tsx
import { useState } from "react";
import { Search, MapPin, Linkedin, Facebook, Instagram, Filter } from "lucide-react";

interface Profissional {
  id: number;
  nome: string;
  especialidade: string;
  status: "Online" | "Offline";
  codigo: string;
  locais: string[];
  redes: { linkedin?: string; facebook?: string; instagram?: string };
  areas: string[];
  conectado?: boolean;
  pendente?: boolean;
  avatar?: string;
}

const profissionais: Profissional[] = [
  {
    id: 1,
    nome: "Dr. João Santos",
    especialidade: "Psicólogo",
    status: "Online",
    codigo: "PROF-001",
    locais: ["Clínica Conecta TEA · São Paulo - SP", "Centro de Desenvolvimento Infantil · São Paulo - SP"],
    redes: { linkedin: "#", instagram: "#" },
    areas: ["ABA", "Denver", "TEACCH", "+1"],
    conectado: true,
  },
  {
    id: 2,
    nome: "Dra. Ana Lima",
    especialidade: "Fonoaudióloga",
    status: "Online",
    codigo: "PROF-002",
    locais: ["Clínica Fala & Vida · São Paulo - SP"],
    redes: { linkedin: "#", facebook: "#" },
    areas: ["Comunicação Alternativa", "PECS", "Desenvolvimento da Linguagem", "+1"],
    pendente: true,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    nome: "Dr. Carlos Mendes",
    especialidade: "Terapeuta Ocupacional",
    status: "Online",
    codigo: "PROF-003",
    locais: ["Centro de Reabilitação Infantil · São Paulo - SP", "Clínica Integrar · São Paulo - SP"],
    redes: { linkedin: "#" },
    areas: ["Integração Sensorial", "Desenvolvimento Motor", "AVDs", "+1"],
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 4,
    nome: "Dra. Maria Silva",
    especialidade: "Psicopedagoga",
    status: "Online",
    codigo: "PROF-004",
    locais: ["Espaço Aprender · São Paulo - SP"],
    redes: { linkedin: "#", instagram: "#" },
    areas: ["Psicopedagogia Clínica", "Inclusão Escolar", "Dificuldades de Aprendizagem", "+1"],
  },
];

export default function Profissionais() {
  const [tab, setTab] = useState("todos");

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
        <h1 className="text-2xl font-semibold">Rede de Profissionais</h1>
        <span className="text-sm text-gray-600">
          Conecte-se e colabore com outros profissionais de saúde
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("todos")}
          className={`px-4 py-2 rounded-lg border ${tab === "todos" ? "bg-gray-900 text-white" : "bg-white"}`}
        >
          Todos os Profissionais
        </button>
        <button
          onClick={() => setTab("conexoes")}
          className={`px-4 py-2 rounded-lg border ${tab === "conexoes" ? "bg-gray-900 text-white" : "bg-white"}`}
        >
          Minhas Conexões (2)
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3 items-center mb-6 bg-white p-4 rounded-lg shadow">
        <div className="flex items-center gap-2 flex-1">
          <Search className="text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nome ou especialidade..."
            className="w-full outline-none text-sm"
          />
        </div>
        <select className="border rounded-lg px-3 py-2 text-sm">
          <option>Todas especialidades</option>
        </select>
        <select className="border rounded-lg px-3 py-2 text-sm">
          <option>Todas cidades</option>
        </select>
        <button className="flex items-center gap-1 border rounded-lg px-3 py-2 text-sm">
          <Filter className="w-4 h-4" /> Limpar
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {profissionais.map((prof) => (
          <div key={prof.id} className="bg-white rounded-xl shadow p-5 flex flex-col">
            {/* Cabeçalho */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={prof.avatar || "https://via.placeholder.com/60"}
                alt={prof.nome}
                className="w-14 h-14 rounded-full border"
              />
              <div>
                <h2 className="font-semibold">{prof.nome}</h2>
                <div className="flex items-center gap-2 text-sm">
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                    {prof.especialidade}
                  </span>
                  <span className="flex items-center gap-1 text-green-600 text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    {prof.status}
                  </span>
                </div>
                <span className="text-xs text-gray-500">{prof.codigo}</span>
              </div>
            </div>

            {/* Locais */}
            <div className="mb-3 text-sm">
              <h3 className="font-medium">Locais de atendimento</h3>
              {prof.locais.map((local, i) => (
                <p key={i} className="flex items-center gap-1 text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400" /> {local}
                </p>
              ))}
            </div>

            {/* Redes sociais */}
            <div className="mb-3 text-sm">
              <h3 className="font-medium">Redes sociais</h3>
              <div className="flex gap-3 mt-1">
                {prof.redes.linkedin && <Linkedin className="w-5 h-5 text-blue-600 cursor-pointer" />}
                {prof.redes.facebook && <Facebook className="w-5 h-5 text-blue-500 cursor-pointer" />}
                {prof.redes.instagram && <Instagram className="w-5 h-5 text-pink-500 cursor-pointer" />}
              </div>
            </div>

            {/* Áreas */}
            <div className="flex flex-wrap gap-2 mb-4">
              {prof.areas.map((area, i) => (
                <span key={i} className="px-2 py-1 bg-gray-100 rounded-lg text-xs">
                  {area}
                </span>
              ))}
            </div>

            {/* Ações */}
            <div className="flex justify-between items-center mt-auto pt-3 border-t">
              <button className="text-sm border rounded-lg px-3 py-1">Ver Perfil</button>
              {prof.conectado ? (
                <button className="text-sm bg-green-500 text-white rounded-lg px-3 py-1">Conectado</button>
              ) : prof.pendente ? (
                <button className="text-sm bg-yellow-400 text-white rounded-lg px-3 py-1">Pendente</button>
              ) : (
                <button className="text-sm bg-gray-900 text-white rounded-lg px-3 py-1">Conectar</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
