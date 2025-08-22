// src/pages/Profissionais.tsx

import { useState } from "react";
import { Search, MapPin, Plus, Eye, MessageSquare, Linkedin, Instagram, Facebook, Filter } from "lucide-react";

interface Profissional {
  id: number;
  nome: string;
  especialidade: string;
  status: string;
  codigo: string;
  locais: { nome: string; cidade: string }[];
  redes: string[];
  areas: string[];
}

const dados: Profissional[] = [
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
  {
    id: 3,
    nome: "Dr. Carlos Mendes",
    especialidade: "Terapeuta Ocupacional",
    status: "Ativo",
    codigo: "PROF-003",
    locais: [
      { nome: "Centro de Reabilitação Infantil", cidade: "São Paulo - SP" },
      { nome: "Clínica Integrar", cidade: "São Paulo - SP" },
    ],
    redes: ["linkedin"],
    areas: ["Integração Sensorial", "Desenvolvimento Motor", "AVDs", "+1"],
  },
];

export default function Profissionais() {
  const [abaAtiva, setAbaAtiva] = useState<'todos' | 'conexoes'>('todos');

  return (
    <div className="min-h-screen bg-[#f8f9fb] py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top search */}
        <div className="flex justify-between items-center mb-6">
          <div className="w-full max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Buscar..." className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg bg-white text-sm" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Gabriel Falcão da Cruz</span>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">PROFISSIONAL</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold">Profissionais</h1>
        <p className="text-gray-600 mb-6">Conecte-se com outros profissionais de saúde</p>

        {/* Tabs and actions */}
        <div className="flex items-center mb-4">
          <div className="flex gap-2">
            <button onClick={() => setAbaAtiva('todos')} className={`px-4 py-2 rounded-full text-sm font-semibold ${abaAtiva === 'todos' ? 'bg-green-500 text-white' : 'bg-white text-gray-700 border border-gray-200'}`}>Todos os Profissionais</button>
            <button onClick={() => setAbaAtiva('conexoes')} className={`px-4 py-2 rounded-full text-sm font-semibold ${abaAtiva === 'conexoes' ? 'bg-white text-gray-700 border border-gray-200' : 'bg-white text-gray-700 border border-gray-200'}`}>Minhas Conexões (2)</button>
          </div>
          <div className="flex-1 flex justify-end">
            <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"><Plus className="w-4 h-4" /> Adicionar</button>
          </div>
        </div>

        {/* Filters button */}
        <div className="mb-6">
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 text-sm">
            <Filter className="w-4 h-4" /> Filtros
          </button>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {dados.map((p) => (
            <div key={p.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-bold mb-2">{p.nome}</h2>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{p.especialidade}</span>
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-200">{p.status}</span>
                </div>

                <div className="text-sm text-gray-700 mb-3">
                  <div className="text-gray-500">Código de Identificação:</div>
                  <div className="font-semibold text-gray-900">{p.codigo}</div>
                </div>

                <div className="mb-3">
                  <div className="text-sm font-medium text-gray-700 mb-2">Locais de atendimento:</div>
                  <ul className="space-y-3">
                    {p.locais.map((l, i) => (
                      <li key={i} className="flex flex-col">
                        <div className="flex items-center gap-2 text-gray-800">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{l.nome}</span>
                        </div>
                        <div className="text-xs text-gray-400 ml-6">{l.cidade}</div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-3">
                  <div className="text-sm font-medium text-gray-700 mb-2">Redes sociais:</div>
                  <div className="flex gap-2">
                    {p.redes.includes('linkedin') && <a href="#" className="bg-blue-50 text-blue-700 rounded-full p-2"><Linkedin className="w-5 h-5" /></a>}
                    {p.redes.includes('instagram') && <a href="#" className="bg-pink-50 text-pink-500 rounded-full p-2"><Instagram className="w-5 h-5" /></a>}
                    {p.redes.includes('facebook') && <a href="#" className="bg-blue-100 text-blue-700 rounded-full p-2"><Facebook className="w-5 h-5" /></a>}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Áreas de atuação:</div>
                  <div className="flex flex-wrap gap-2">
                    {p.areas.slice(0, 3).map((a, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">{a}</span>
                    ))}
                    {p.areas.length > 3 && <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">+{p.areas.length - 3}</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"><Eye className="w-4 h-4" /> Ver Perfil</button>
                <button className="bg-green-500 text-white rounded-full p-3 hover:bg-green-600"><MessageSquare className="w-5 h-5" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
