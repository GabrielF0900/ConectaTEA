import { useState } from "react";
import { Search, MapPin, Plus, Eye, MessageSquare, Linkedin, Instagram, Facebook, UserPlus2 } from "lucide-react";

interface Professional {
  id: string;
  name: string;
  role: string;
  status: string;
  code: string;
  locations: string[];
  social: string[];
  areas: string[];
}

const professionals: Professional[] = [
  {
    id: "1",
    name: "Dr. João Santos",
    role: "Psicólogo",
    status: "Ativo",
    code: "PROF-001",
    locations: ["Clínica Conecta TEA - São Paulo - SP", "Centro de Desenvolvimento Infantil - São Paulo - SP"],
    social: ["linkedin", "instagram"],
    areas: ["ABA", "Denver", "TEACCH", "Terapia Comportamental"],
  },
  {
    id: "2",
    name: "Dra. Ana Lima",
    role: "Fonoaudióloga",
    status: "Ativo",
    code: "PROF-002",
    locations: ["Clínica Fala & Vida - São Paulo - SP"],
    social: ["linkedin", "facebook"],
    areas: ["Comunicação Alternativa", "PECS", "Desenvolvimento da Linguagem"],
  },
  {
    id: "3",
    name: "Dr. Carlos Mendes",
    role: "Terapeuta Ocupacional",
    status: "Ativo",
    code: "PROF-003",
    locations: ["Centro de Reabilitação Infantil - São Paulo - SP", "Clínica Integrar - São Paulo - SP"],
    social: ["linkedin"],
    areas: ["Integração Sensorial", "Desenvolvimento Motor", "AVDs"],
  },
];

export default function ProfessionalsPage() {
  const [activeTab, setActiveTab] = useState("todos");

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Barra de busca e header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 w-full max-w-md bg-gray-100 px-3 py-2 rounded-lg">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar..."
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Gabriel Falcão da Cruz</span>
          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
            PROFISSIONAL
          </span>
        </div>
      </div>

      {/* Título e subtítulo */}
      <h2 className="text-2xl font-bold">Profissionais</h2>
      <p className="text-gray-600 mb-4">Conecte-se com outros profissionais de saúde</p>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setActiveTab("todos")}
          className={`px-4 py-2 rounded font-medium ${
            activeTab === "todos"
              ? "bg-green-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Todos os Profissionais
        </button>
        <button
          onClick={() => setActiveTab("conexoes")}
          className={`px-4 py-2 rounded font-medium ${
            activeTab === "conexoes"
              ? "bg-green-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Minhas Conexões (2)
        </button>
        <button className="ml-auto flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
          <Plus className="w-4 h-4" /> Adicionar
        </button>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {professionals.map((prof) => {
          const showMore = prof.areas.length > 3;
          return (
            <div key={prof.id} className="border rounded-xl p-6 bg-white shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg mb-1">{prof.name}</h3>
                <div className="flex gap-2 mb-2 text-sm">
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">
                    {prof.role}
                  </span>
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">
                    {prof.status}
                  </span>
                </div>

                <div className="text-sm text-gray-700 mb-2">
                  <span className="font-medium">Código de Identificação:</span>
                  <span className="ml-1 font-bold tracking-wide">{prof.code}</span>
                </div>

                <div className="mb-2">
                  <span className="font-medium text-sm">Locais de atendimento:</span>
                  <ul className="text-sm text-gray-700 space-y-1 mt-1">
                    {prof.locations.map((loc, i) => (
                      <li key={i} className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className={i === 0 ? "font-semibold" : "font-medium"}>{loc.split(' - ')[0]}</span>
                        <span className="text-xs text-gray-500">{loc.split(' - ')[1]}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-2">
                  <span className="font-medium text-sm">Redes sociais:</span>
                  <div className="flex gap-2 mt-1">
                    {prof.social.includes("linkedin") && (
                      <a href="#" className="bg-blue-50 text-blue-700 rounded-full p-2 hover:bg-blue-100" title="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                    )}
                    {prof.social.includes("instagram") && (
                      <a href="#" className="bg-pink-50 text-pink-500 rounded-full p-2 hover:bg-pink-100" title="Instagram"><Instagram className="w-5 h-5" /></a>
                    )}
                    {prof.social.includes("facebook") && (
                      <a href="#" className="bg-blue-100 text-blue-700 rounded-full p-2 hover:bg-blue-200" title="Facebook"><Facebook className="w-5 h-5" /></a>
                    )}
                  </div>
                </div>

                <div className="mb-2">
                  <span className="font-medium text-sm">Áreas de atuação:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {prof.areas.slice(0, 3).map((area, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {area}
                      </span>
                    ))}
                    {showMore && (
                      <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                        +{prof.areas.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Botões */}
              <div className="flex justify-between items-center mt-4 pt-3 border-t">
                <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-50">
                  <Eye className="w-4 h-4" />
                  Ver Perfil
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
