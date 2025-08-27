// Componente para os cards de resumo do topo
function SummaryCard({ icon: Icon, label, value, tooltip }: { icon: React.ElementType; label: string; value: number; tooltip: string }) {
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-sm px-6 py-4 w-44 hover:shadow-md transition-all group relative">
      <div className="mb-2">
        <Icon className="h-7 w-7 text-green-600" />
      </div>
      <div className="text-lg font-bold text-green-800">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
      <div className="absolute left-1/2 -bottom-8 z-10 w-max -translate-x-1/2 scale-0 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
        {tooltip}
      </div>
    </div>
  );
}

// Componente para cada meta
function MetaCard({ meta }: { meta: Meta }) {
  let prioridadeTone: "default" | "success" | "warning" | "danger" = "default";
  if (meta.prioridade === "alta") prioridadeTone = "danger";
  else if (meta.prioridade === "media") prioridadeTone = "warning";
  else prioridadeTone = "default";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <img src={meta.crianca.avatarUrl} alt={meta.crianca.nome} className="w-12 h-12 rounded-full border" />
          <div>
            <div className="font-semibold text-lg text-green-800">{meta.titulo}</div>
            <div className="text-xs text-gray-500">{meta.categoria} • {meta.status}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-400">Período: {meta.periodo}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:justify-end">
          <OutlineButton icon={Eye}>Ver Detalhes</OutlineButton>
          <OutlineButton icon={TrendingUp}>Atualizar Progresso</OutlineButton>
          <OutlineButton icon={Pencil}>Editar</OutlineButton>
        </div>
      </div>
      <div className="mt-6">
        <div className="mb-2 text-sm font-semibold text-gray-700">Progresso</div>
        <ProgressBar value={meta.progresso} />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button className="rounded-md border border-green-300 px-3 py-1 text-xs font-medium text-green-800 hover:bg-green-50">+5%</button>
        <button className="rounded-md border border-green-300 px-3 py-1 text-xs font-medium text-green-800 hover:bg-green-50">+10%</button>
        <Badge tone={prioridadeTone}>Prioridade {meta.prioridade}</Badge>
      </div>
    </div>
  );
}
import React from "react";
import { TrendingUp, Filter, Eye, Pencil, CalendarDays, Target, CheckCircle2, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

// import { useNotificacoesContext } from '../../../api/barraNotificacao';

// Paleta (verde como identidade)
const colors = {
  green: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
  },
  gray: {
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
  },
};

function Badge({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "success" | "warning" | "danger" }) {
  const map: Record<string, string> = {
    default: `bg-white text-green-800 border border-green-200`,
    success: `bg-${"white"} text-green-800 border border-green-200`,
    warning: `bg-white text-amber-800 border border-amber-200`,
    danger: `bg-white text-red-800 border border-red-200`,
  };
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${map[tone]}`}>
      {children}
    </span>
  );
}

function OutlineButton({ icon: Icon, children }: { icon?: React.ElementType; children: React.ReactNode }) {
  return (
    <button className="inline-flex items-center gap-2 rounded-md border border-green-300 px-3 py-2 text-sm font-medium text-green-800 hover:bg-green-50 active:bg-green-100 transition-colors">
      {Icon ? <Icon className="h-4 w-4" /> : null}
      <span>{children}</span>
    </button>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full">
      <div className="mb-1 flex items-center justify-end text-sm font-semibold text-green-800">
        {value}%
      </div>
      <div className="h-3 w-full rounded-full bg-gray-200">
        <div
          className="h-3 rounded-full"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${colors.green[400]} 0%, ${colors.green[700]} 100%)`,
          }}
        />
      </div>
    </div>
  );
}

type Meta = {
  id: number;
  titulo: string;
  categoria: string;
  status: "Em Andamento" | "Quase Concluída" | "Concluída";
  prioridade: "alta" | "media" | "baixa";
  crianca: { nome: string; avatarUrl?: string };
  profissional: string;
  periodo: string; // "31/12/2023 - 30/03/2024"
  progresso: number;
};

const metas: Meta[] = [
  {
    id: 1,
    titulo: "Melhorar comunicação verbal",
    categoria: "Comunicação",
    status: "Em Andamento",
    prioridade: "media",
    crianca: { nome: "Ana Silva", avatarUrl: "https://i.pravatar.cc/64?img=5" },
    profissional: "Dr. João Santos",
    periodo: "31/12/2023 - 30/03/2024",
    progresso: 75,
  },
  {
    id: 2,
    titulo: "Desenvolver habilidades sociais",
    categoria: "Social",
    status: "Em Andamento",
    prioridade: "alta",
    crianca: { nome: "Pedro Costa", avatarUrl: "https://i.pravatar.cc/64?img=12" },
    profissional: "Dra. Ana Lima",
    periodo: "14/01/2024 - 14/04/2024",
    progresso: 45,
  },
  {
    id: 3,
    titulo: "Reduzir comportamentos repetitivos",
    categoria: "Comportamental",
    status: "Quase Concluída",
    prioridade: "alta",
    crianca: { nome: "Sofia Oliveira", avatarUrl: "https://i.pravatar.cc/64?img=32" },
    profissional: "Dr. Roberto Silva",
    periodo: "30/11/2023 - 28/02/2024",
    progresso: 90,
  },
  {
    id: 4,
    titulo: "Aumentar tempo de atenção focada",
    categoria: "Cognitiva",
    status: "Em Andamento",
    prioridade: "baixa",
    crianca: { nome: "Ana Silva", avatarUrl: "https://i.pravatar.cc/64?img=5" },
    profissional: "Dr. João Santos",
    periodo: "09/01/2024 - 09/04/2024",
    progresso: 30,
  },

export default function MetasPage() {
  const [openMenu, setOpenMenu] = React.useState(false);
  const navigate = useNavigate();
  // const { notificarSucesso } = useNotificacoesContext();
  return (
    <div className="h-full bg-[#f8f9fb]">
      {/* Header padrão com dropdown de perfil */}
  <div className="bg-white border-b px-6 py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Metas</h1>
            <p className="text-sm text-gray-500 mt-1">Gerencie as metas terapêuticas das crianças</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
              <span className="text-lg">+</span>
              Nova Meta
            </button>
            <div className="relative">
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="flex items-center gap-3 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={openMenu}
              >
                <img
                  src="/conectatea.svg"
                  alt="avatar"
                  className="w-9 h-9 rounded-full border"
                />
                <div className="text-left">
                  <div className="font-semibold">{localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string).name || JSON.parse(localStorage.getItem('user') as string).nome : 'Perfil'}</div>
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
                    onClick={() => {
                      setOpenMenu(false);
                      const user = localStorage.getItem('user');
                      let userId = null;
                      if (user) {
                        try {
                          const u = JSON.parse(user);
                          userId = u?.id ?? u?.userId ?? null;
                        } catch { /* ignorar erro de parse do usuário */ }
                      }
                      if (userId) {
                        navigate(`/profissional/perfil/${userId}`);
                      }
                    }}
                  >
                    <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 100 12A6 6 0 0010 2z"/></svg>
                    Meu Perfil
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
                    onClick={() => {
                      setOpenMenu(false);
                      localStorage.clear();
                      if (typeof window !== 'undefined') window.location.href = '/login';
                    }}
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar topo */}
      <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-row justify-center gap-8 w-full">
          <SummaryCard icon={Target} label="Total de Metas" value={47} tooltip="Quantidade total de metas cadastradas." />
          <SummaryCard icon={TrendingUp} label="Em Andamento" value={32} tooltip="Metas que estão em andamento no momento." />
          <SummaryCard icon={AlertTriangle} label="Vencendo" value={8} tooltip="Metas próximas do prazo de vencimento." />
          <SummaryCard icon={CheckCircle2} label="Concluídas" value={15} tooltip="Metas já concluídas." />
        </div>
  {/* Espaço reservado para alinhamento, sem botão Nova Meta */}
      </div>

      {/* Busca + Filtro */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 md:px-8 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-xl">
              <input
                type="text"
                placeholder="Buscar metas por nome da criança ou título..."
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
              />
            </div>
            <button className="inline-flex items-center gap-2 rounded-md border border-green-300 px-4 py-2 text-sm font-medium text-green-800 hover:bg-green-50">
              <Filter className="h-4 w-4" />
              Filtrar
            </button>
          </div>
        </div>
      </div>

      {/* Lista de Metas */}
  <div className="mt-6 space-y-5 px-4 md:px-8">
        {metas.map((m) => (
          <MetaCard key={m.id} meta={m} />
        ))}
      </div>
    </div>
  );
}
