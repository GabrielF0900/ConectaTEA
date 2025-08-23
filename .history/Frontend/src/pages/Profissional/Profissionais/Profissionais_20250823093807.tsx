// src/pages/Profissionais.tsx
import { useState } from "react";
import { Search, MapPin, Linkedin, Facebook, Instagram, Filter, Eye, MessageSquare, Check, Clock, UserPlus } from "lucide-react";

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
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="h-full bg-[#f8f9fb]">
      {/* Top header bar (title + actions) */}
      <div className="bg-white border-b px-6 py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Title + subtitle in header */}
          <div>
            <h1 className="text-2xl font-bold">Rede de Profissionais</h1>
            <p className="text-sm text-gray-500 mt-1">Conecte-se e colabore com outros profissionais de saúde</p>
          </div>

          {/* Actions on the right */}
          <div className="flex items-center gap-4">
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
              <span className="text-lg">+</span>
              Adicionar
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v18H3V3h6z" />
              </svg>
            </button>
            <div className="relative">
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="flex items-center gap-3 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={openMenu}
              >
                <img
                  src="https://randomuser.me/api/portraits/women/65.jpg"
                  alt="avatar"
                  className="w-9 h-9 rounded-full border"
                />
                <div className="text-left">
                  <div className="font-semibold">Gabriel Falcão da Cruz</div>
                  <div className="text-xs bg-green-100 text-green-600 rounded px-2 py-1">PROFISSIONAL</div>
                </div>
                <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.12 1l-4.25 4.65a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>

              {openMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-50">
                  <button
                    className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setOpenMenu(false)}
                  >
                    <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 100 12A6 6 0 0010 2z"/></svg>
                    Ver Perfil
                  </button>
                  <button
                    className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setOpenMenu(false)}
                  >
                    <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path d="M6 2a1 1 0 000 2h8a1 1 0 100-2H6z"/></svg>
                    Configurações
                  </button>
                  <div className="border-t" />
                  <button
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
                    onClick={() => setOpenMenu(false)}
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 p-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab("todos")}
            className={`px-4 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-green-200 ${
              tab === "todos"
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-green-600 border border-green-200 hover:bg-green-50"
            }`}
          >
            Todos os Profissionais
          </button>
          <button
            onClick={() => setTab("conexoes")}
            className={`px-4 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-green-200 ${
              tab === "conexoes"
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-green-600 border border-green-200 hover:bg-green-50"
            }`}
          >
            Minhas Conexões (2)
          </button>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-3 items-center mb-6 bg-white p-4 rounded-lg shadow">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-gray-400 w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Buscar por nome ou especialidade..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm"
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
            <article key={prof.id} className="bg-white rounded-xl shadow p-5 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={prof.avatar || "https://via.placeholder.com/60"}
                  alt={prof.nome}
                  className="w-14 h-14 rounded-full border"
                />
                <div>
                  <h2 className="font-semibold">{prof.nome}</h2>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700">{prof.especialidade}</span>
                    <span className="flex items-center gap-1 text-green-600 text-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      {prof.status}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{prof.codigo}</span>
                </div>
              </div>

              <div className="mb-3 text-sm">
                <h3 className="font-medium">Locais de atendimento</h3>
                {prof.locais.map((local, i) => (
                  <p key={i} className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" /> {local}
                  </p>
                ))}
              </div>

              <div className="mb-3 text-sm">
                <h3 className="font-medium">Redes sociais</h3>
                <div className="flex gap-3 mt-1">
                  {prof.redes.linkedin && <Linkedin className="w-5 h-5 text-blue-600 cursor-pointer" />}
                  {prof.redes.facebook && <Facebook className="w-5 h-5 text-blue-500 cursor-pointer" />}
                  {prof.redes.instagram && <Instagram className="w-5 h-5 text-pink-500 cursor-pointer" />}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {prof.areas.map((area, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-100 rounded-lg text-xs">{area}</span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-auto pt-3 border-t">
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 text-sm border rounded-lg px-3 py-2 bg-white hover:bg-gray-50">
                    <Eye className="w-4 h-4 text-gray-600" />
                    Ver Perfil
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  {prof.conectado ? (
                    <div className="flex items-center gap-2 bg-green-500 text-white rounded-lg px-4 py-2">
                      <Check className="w-4 h-4" />
                      <span className="text-sm">Conectado</span>
                    </div>
                  ) : prof.pendente ? (
                    <div className="flex items-center gap-2 border border-orange-200 text-orange-600 rounded-lg px-4 py-2 bg-orange-50">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Pendente</span>
                    </div>
                  ) : (
                    <button className="flex items-center gap-2 border border-green-200 text-green-600 rounded-lg px-4 py-2 hover:bg-green-50">
                      <UserPlus className="w-4 h-4" />
                      <span className="text-sm">Conectar</span>
                    </button>
                  )}

                  <button className="w-9 h-9 rounded-full border border-green-200 flex items-center justify-center text-green-600 hover:bg-green-50">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
