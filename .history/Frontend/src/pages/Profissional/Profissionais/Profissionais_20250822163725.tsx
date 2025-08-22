import { useMemo } from "react";
import {
  Search,
  UserRound,
  Filter,
  Plus,
  MapPin,
  Eye,
  MessageCircle,
  Settings,
  Instagram,
  Linkedin,
} from "lucide-react";

/** Helpers visuais */
const Badge = ({ children, color }: { children: React.ReactNode; color: "blue" | "green" | "gray" }) => {
  const styles =
    color === "blue"
      ? "bg-blue-100 text-blue-700"
      : color === "green"
      ? "bg-green-100 text-green-700"
      : "bg-gray-100 text-gray-700";
  return <span className={`px-2 py-0.5 rounded text-sm ${styles}`}>{children}</span>;
};

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700">{children}</span>
);

type Prof = {
  id: string;
  nome: string;
  cargo: string;
  status: "Ativo" | "Inativo";
  codigo: string;
  locais: Array<{ nome: string; cidade: string }>;
  redes: Array<"linkedin" | "instagram">;
  areas: string[];
  acoes?: Array<"chat" | "settings">;
};

const data: Prof[] = [
  {
    id: "1",
    nome: "Dr. João Santos",
    cargo: "Psicólogo",
    status: "Ativo",
    codigo: "PROF-001",
    locais: [
      { nome: "Clínica Conecta TEA", cidade: "São Paulo - SP" },
      { nome: "Centro de Desenvolvimento Infantil", cidade: "São Paulo - SP" },
    ],
    redes: ["linkedin", "instagram"],
    areas: ["ABA", "Denver", "TEACCH", "+1"],
    acoes: ["chat"],
  },
  {
    id: "2",
    nome: "Dra. Ana Lima",
    cargo: "Fonoaudióloga",
    status: "Ativo",
    codigo: "PROF-002",
    locais: [{ nome: "Clínica Fala & Vida", cidade: "São Paulo - SP" }],
    redes: ["linkedin"],
    areas: ["Comunicação Alternativa", "PECS", "Desenvolvimento da Linguagem", "+1"],
    acoes: ["chat", "settings"],
  },
  {
    id: "3",
    nome: "Dr. Carlos Mendes",
    cargo: "Terapeuta Ocupacional",
    status: "Ativo",
    codigo: "PROF-003",
    locais: [
      { nome: "Centro de Reabilitação Infantil", cidade: "São Paulo - SP" },
      { nome: "Clínica Integrar", cidade: "São Paulo - SP" },
    ],
    redes: ["linkedin"],
    areas: ["Integração Sensorial", "Desenvolvimento Motor", "AVDs", "+1"],
    acoes: ["chat"],
  },
];

export default function ProfissionaisExato() {
  const profissionais = useMemo(() => data, []);

  return (
    <div className="w-full bg-white">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="flex items-center justify-between gap-4">
          {/* Busca */}
          <div className="flex items-center gap-2 w-full max-w-md bg-gray-100 rounded-xl px-3 py-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              className="bg-transparent outline-none w-full text-sm"
              placeholder="Buscar..."
            />
          </div>

          {/* Usuário + badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100">
              <UserRound className="w-5 h-5 text-gray-500" />
            </div>
            <span className="text-sm font-medium">Gabriel Falcão da Cruz</span>
            <span className="text-xs rounded px-2 py-1 bg-green-100 text-green-700">PROFISSIONAL</span>
          </div>
        </div>

        {/* Título */}
        <div className="mt-8">
          <h1 className="text-3xl font-bold">Profissionais</h1>
          <p className="text-gray-600 mt-1">Conecte-se com outros profissionais de saúde</p>
        </div>

        {/* Tabs + Adicionar */}
        <div className="mt-6 flex items-center gap-3">
          <button className="rounded-full px-4 py-2 text-white bg-green-500 hover:bg-green-600 transition">
            Todos os Profissionais
          </button>
          <button className="rounded-full px-4 py-2 bg-white border text-gray-800">
            Minhas Conexões (2)
          </button>

          <div className="ml-auto">
            <button className="inline-flex items-center gap-2 rounded-md px-4 py-2 bg-green-500 text-white hover:bg-green-600 transition">
              <Plus className="w-4 h-4" />
              Adicionar
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="mt-4">
          <button className="inline-flex items-center gap-2 rounded-lg px-3 py-2 border text-gray-700">
            <Filter className="w-4 h-4" />
            Filtros
          </button>
        </div>

        {/* Cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
          {professionais.map((p) => (
            <article
              key={p.id}
              className="rounded-2xl bg-white border shadow-sm px-5 pt-5 pb-3 flex flex-col"
            >
              {/* Cabeçalho */}
              <h3 className="text-lg font-semibold">{p.nome}</h3>
              <div className="flex items-center gap-2 mt-2">
                <Badge color="blue">{p.cargo}</Badge>
                <Badge color="green">{p.status}</Badge>
              </div>

              {/* Código */}
              <div className="mt-4 text-sm">
                <p className="text-gray-600 font-medium">Código de Identificação:</p>
                <p className="mt-1"> {p.codigo}</p>
              </div>

              {/* Locais */}
              <div className="mt-4 text-sm">
                <p className="text-gray-600 font-medium">Locais de atendimento:</p>
                <ul className="mt-2 space-y-2">
                  {p.locais.map((l, i) => (
                    <li key={i} className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{l.nome}</span>
                      </div>
                      <span className="pl-6 text-gray-500">{l.cidade}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Redes sociais */}
              <div className="mt-4 text-sm">
                <p className="text-gray-600 font-medium">Redes sociais:</p>
                <div className="mt-2 flex items-center gap-3">
                  {p.redes.includes("linkedin") && (
                    <a
                      href="#"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-blue-100 text-blue-700"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {p.redes.includes("instagram") && (
                    <a
                      href="#"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-pink-100 text-pink-600"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Áreas */}
              <div className="mt-4 text-sm">
                <p className="text-gray-600 font-medium">Áreas de atuação:</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.areas.map((a, i) => (
                    <Chip key={i}>{a}</Chip>
                  ))}
                </div>
              </div>

              {/* Ações */}
              <div className="mt-6 pt-3 border-t flex items-center gap-2">
                <button className="mx-auto inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:bg-gray-50">
                  <Eye className="w-4 h-4" />
                  Ver Perfil
                </button>

                {/* Botões à direita como no print (chat e/ou settings) */}
                <div className="ml-auto flex items-center gap-2">
                  {p.acoes?.includes("chat") && (
                    <button
                      className="inline-flex items-center justify-center rounded-full p-2 border border-green-500 text-green-600 hover:bg-green-50"
                      aria-label="Abrir chat"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  )}
                  {p.acoes?.includes("settings") && (
                    <button
                      className="inline-flex items-center justify-center rounded-full p-2 border text-gray-600 hover:bg-gray-50"
                      aria-label="Opções"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
