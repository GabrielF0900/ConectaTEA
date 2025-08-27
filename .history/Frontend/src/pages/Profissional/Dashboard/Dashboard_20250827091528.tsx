import React from "react";

const criancas = [
  {
    nome: "Ana Silva",
    idade: "6 anos",
    nivel: "TEA Leve",
    profissional: "Dr. Maria Santos",
    status: "Ativo",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    nome: "João Pedro",
    idade: "8 anos",
    nivel: "TEA Moderado",
    profissional: "Dr. Carlos Lima",
    status: "Ativo",
    avatar: "https://randomuser.me/api/portraits/men/43.jpg",
  },
  {
    nome: "Sofia Costa",
    idade: "5 anos",
    nivel: "TEA Leve",
    profissional: "Dra. Ana Oliveira",
    status: "Ativo",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    nome: "Lucas Ferreira",
    idade: "7 anos",
    nivel: "TEA Severo",
    profissional: "Dr. Pedro Rocha",
    status: "Pausado",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
  },
];

const metas = [
  {
    nome: "Ana Silva",
    meta: "Melhorar comunicação verbal",
    progresso: 85,
    status: "Em andamento",
  },
  {
    nome: "João Pedro",
    meta: "Desenvolver habilidades sociais",
    progresso: 60,
    status: "Em andamento",
  },
  {
    nome: "Sofia Costa",
    meta: "Reduzir comportamentos repetitivos",
    progresso: 92,
    status: "Quase concluída",
  },
  {
    nome: "Lucas Ferreira",
    meta: "Aumentar tempo de atenção",
    progresso: 45,
    status: "Em andamento",
  },
];

const cardIcons = [
  (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
  ),
  (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4V7a4 4 0 10-8 0v3m12 0v3a4 4 0 01-8 0V7" /></svg>
  ),
  (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
  ),
  (
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9a4 4 0 00-4-4H7a4 4 0 00-4 4v8m16 0a4 4 0 01-4 4H7a4 4 0 01-4-4" /></svg>
  ),
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Acompanhe o progresso e gerencie as atividades</p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="relative">
            <input type="text" placeholder="Buscar..." className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-200 bg-white" />
            <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" /></svg>
          </div>
          <button className="relative p-2 rounded-full hover:bg-gray-100">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-2">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" className="w-10 h-10 rounded-full border-2 border-green-500" />
            <div className="text-right">
              <p className="font-semibold text-sm leading-4">Gabriel Falcão da Cruz</p>
              <span className="text-green-600 text-xs font-bold">PROFISSIONAL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cards superiores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            valor: 24,
            label: "Total de Crianças",
            sub: "+2 este mês",
            tooltip: "Quantidade total de crianças cadastradas na plataforma."
          },
          {
            valor: 8,
            label: "Profissionais Ativos",
            sub: "+1 este mês",
            tooltip: "Número de profissionais ativos atualmente."
          },
          {
            valor: 47,
            label: "Metas Ativas",
            sub: "+5 esta semana",
            tooltip: "Total de metas em andamento para as crianças."
          },
          {
            valor: "78%",
            label: "Taxa de Progresso",
            sub: "+12% este mês",
            tooltip: "Porcentagem média de progresso das metas."
          },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-[#fcfcfc] shadow-md rounded-2xl p-6 flex items-center gap-4 transition-all duration-200 relative group cursor-pointer hover:-translate-y-2 focus:-translate-y-2 hover:bg-white hover:shadow-2xl hover:border hover:border-green-200"
            tabIndex={0}
          >
            {/* Tooltip acima do card */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 z-10 hidden group-hover:flex group-focus:flex flex-col items-center">
              <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg whitespace-nowrap animate-fade-in-up">
                {card.tooltip}
              </div>
              <div className="w-3 h-3 bg-gray-900 rotate-45 mt-1"></div>
            </div>
            <div className="flex items-center justify-center w-14 h-14 rounded-xl border border-green-200 bg-green-50 group-hover:bg-green-100 group-hover:border-green-400 transition-all duration-200">
              {cardIcons[i]}
            </div>
            <div>
              <p className="text-2xl font-bold">{card.valor}</p>
              <p className="text-gray-600 font-medium">{card.label}</p>
              <span className="text-sm text-green-600 font-semibold">{card.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Conteúdo principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Crianças Recentes */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">Crianças Recentes</h2>
            <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              Adicionar
            </button>
          </div>
          <div className="space-y-3">
            {criancas.map((crianca, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <img src={crianca.avatar} alt={crianca.nome} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow" />
                  <div>
                    <p className="font-semibold text-base">{crianca.nome}</p>
                    <p className="text-xs text-gray-500">{crianca.idade} · {crianca.nivel}</p>
                    <p className="text-xs text-gray-400">Profissional: {crianca.profissional}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    crianca.status === "Ativo"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-200 text-gray-600"
                  }`}>
                    {crianca.status}
                  </span>
                  <button className="p-1 rounded hover:bg-gray-200">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Metas em Andamento */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">Metas em Andamento</h2>
            <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              Nova Meta
            </button>
          </div>
          <div className="space-y-4">
            {metas.map((meta, index) => (
              <div key={index} className="bg-gray-50 rounded-xl px-4 py-3">
                <div className="flex justify-between items-center mb-1">
                  <div>
                    <p className="font-semibold text-base">{meta.nome}</p>
                    <p className="text-xs text-gray-500">{meta.meta}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      meta.status === "Quase concluída"
                        ? "bg-green-100 text-green-600"
                        : "bg-blue-100 text-blue-600"
                    }`}>
                      {meta.status}
                    </span>
                    <p className="font-bold text-green-600 text-base">{meta.progresso}%</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${meta.progresso}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
