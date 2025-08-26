import React from "react";
import { Plus, TrendingUp, Filter, Eye, Pencil, CalendarDays, Target, CheckCircle2, AlertTriangle } from "lucide-react";

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
    default: `bg-green-50 text-green-800 border border-green-200`,
    success: `bg-green-50 text-green-800 border border-green-200`,
    warning: `bg-green-50 text-amber-800 border border-amber-200`,
    danger: `bg-green-50 text-red-800 border border-red-200`,
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
];

function SummaryCard({ icon: Icon, label, value, tooltip }: { icon: React.ElementType; label: string; value: number | string; tooltip?: string }) {
  return (
  <div className="relative rounded-2xl border border-gray-200 bg-green-50 p-8 shadow-md group transition-all flex flex-col items-center justify-center min-w-[210px] min-h-[130px] cursor-pointer hover:shadow-2xl hover:border-green-500 focus-within:shadow-2xl focus-within:border-green-600">
      <div className="flex items-center gap-4 text-green-700">
        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-green-50">
          <Icon className="h-7 w-7" />
        </div>
        <div className="text-4xl font-bold">{value}</div>
      </div>
      <div className="mt-3 text-base text-gray-600 font-medium">{label}</div>
      {tooltip && (
        <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-green-700 px-4 py-2 text-xs text-white opacity-0 group-hover:opacity-100 group-hover:translate-y-[-10px] transition-all pointer-events-none shadow-lg">
          {tooltip}
        </div>
      )}
    </div>
  );
}

function MetaCard({ meta }: { meta: Meta }) {
  const prioridadeTone: "default" | "success" | "warning" | "danger" =
    meta.prioridade === "alta"
      ? "danger"
      : meta.prioridade === "media"
      ? "warning"
      : "success";
  const statusTone: "default" | "success" | "warning" | "danger" = meta.status === "Concluída" ? "success" : "default";

  return (
  <div className="relative rounded-2xl border border-gray-200 bg-green-50 p-6 shadow-sm group transition-all cursor-pointer hover:shadow-2xl hover:border-green-500 focus-within:shadow-2xl focus-within:border-green-600">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-semibold text-gray-900">{meta.titulo}</h3>
            <Badge tone={statusTone}>{meta.status}</Badge>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge> {meta.categoria} </Badge>
          </div>

          <div className="mt-4 flex items-center gap-3 text-sm text-gray-700">
            <img src={meta.crianca.avatarUrl} alt={meta.crianca.nome} className="h-9 w-9 rounded-full object-cover ring-2 ring-green-200" />
            <div className="leading-tight">
              <div>
                <span className="font-semibold">Criança:</span> {meta.crianca.nome}
              </div>
              <div className="text-gray-600">
                Profissional: {meta.profissional}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
            <CalendarDays className="h-4 w-4" />
            <span>
              Período: {meta.periodo}
            </span>
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

export default function MetasPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Metas</h1>
        <p className="mt-1 text-gray-600">Gerencie as metas terapêuticas das crianças</p>
      </div>

      {/* Toolbar topo */}
      <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-row justify-center gap-8 w-full">
          <SummaryCard icon={Target} label="Total de Metas" value={47} tooltip="Quantidade total de metas cadastradas." />
          <SummaryCard icon={TrendingUp} label="Em Andamento" value={32} tooltip="Metas que estão em andamento no momento." />
          <SummaryCard icon={AlertTriangle} label="Vencendo" value={8} tooltip="Metas próximas do prazo de vencimento." />
          <SummaryCard icon={CheckCircle2} label="Concluídas" value={15} tooltip="Metas já concluídas." />
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:ml-8 mt-4 md:mt-0">
          <button className="inline-flex items-center justify-center gap-2 rounded-md bg-green-700 px-6 py-2 font-medium text-white shadow hover:bg-green-800">
            <Plus className="h-4 w-4" />
            <span>Nova Meta</span>
          </button>
        </div>
      </div>

      {/* Busca + Filtro */}
  <div className="mt-6 rounded-2xl border border-gray-200 bg-green-50 p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-xl">
            <input
              type="text"
              placeholder="Buscar metas por nome da criança ou título..."
              className="w-full rounded-xl border border-gray-200 bg-green-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
            />
          </div>
          <button className="inline-flex items-center gap-2 rounded-md border border-green-300 px-4 py-2 text-sm font-medium text-green-800 hover:bg-green-50">
            <Filter className="h-4 w-4" />
            Filtrar
          </button>
        </div>
      </div>

      {/* Lista de Metas */}
      <div className="mt-6 space-y-5">
        {metas.map((m) => (
          <MetaCard key={m.id} meta={m} />
        ))}
      </div>
    </div>
  );
}
