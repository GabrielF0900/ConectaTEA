export default function Dashboard() {
  return (
    <div className="h-full">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 sticky top-0 z-30">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-500">Acompanhe o progresso e gerencie as atividades</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Busca */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar..."
                className="block w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            {/* Notificações */}
            <button className="p-2 text-gray-400 hover:text-gray-600 relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v18H3V3h6z" />
              </svg>
              {/* Bolinha vermelha de notificação */}
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            {/* Usuário */}
            <div className="flex items-center gap-3">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" className="w-9 h-9 rounded-full border" />
              <div className="text-left">
                <div className="font-semibold">Gabriel Falcão</div>
                <div className="px-2 py-0.5 text-xs bg-green-100 text-green-600 rounded-full">PROFISSIONAL</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-6 space-y-6">
        {/* Cards de resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Total de Crianças */}
          <div className="bg-white rounded-xl shadow-md border p-5 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">Total de Crianças</span>
              <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 100 12A6 6 0 0010 2zM2 18a8 8 0 1116 0H2z" />
                </svg>
              </div>
            </div>
            <span className="text-3xl font-bold mb-1">24</span>
            <span className="text-xs text-gray-400">+2 este mês</span>
          </div>

          {/* Profissionais Ativos */}
          <div className="bg-white rounded-xl shadow-md border p-5 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">Profissionais Ativos</span>
              <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 7a3 3 0 11-6 0 3 3 0 016 0zM4 15a4 4 0 118-0H4z" />
                </svg>
              </div>
            </div>
            <span className="text-3xl font-bold mb-1">8</span>
            <span className="text-xs text-gray-400">+1 este mês</span>
          </div>

          {/* Metas Ativas */}
          <div className="bg-white rounded-xl shadow-md border p-5 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">Metas Ativas</span>
              <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11l-4-3 4-3v6z" />
                </svg>
              </div>
            </div>
            <span className="text-3xl font-bold mb-1">47</span>
            <span className="text-xs text-gray-400">+5 esta semana</span>
          </div>

          {/* Taxa de Progresso */}
          <div className="bg-white rounded-xl shadow-md border p-5 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">Taxa de Progresso</span>
              <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 3v2h2l3.6 7.59-1.35 2.44C7.08 15.37 7 15.69 7 16a2 2 0 002 2h9v-2H9.42a.25.25 0 01-.25-.25L9.5 15h7.75a1 1 0 00.92-.62l3.24-7.23a1 1 0 00-.91-1.38H6.21l-.94-2H3z" />
                </svg>
              </div>
            </div>
            <span className="text-3xl font-bold mb-1">78%</span>
            <span className="text-xs text-gray-400">+12% este mês</span>
          </div>
        </div>

        {/* Listas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Crianças Recentes */}
          <div className="bg-white rounded-xl shadow-md border p-5">
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-semibold text-lg">Crianças Recentes</h2>
              <button className="bg-green-600 text-white px-4 py-1.5 rounded-full hover:bg-green-700 transition-colors text-sm font-medium">
                + Adicionar
              </button>
            </div>

            <div className="space-y-4">
              {[
                { nome: "Ana Silva", idade: "6 anos · TEA Leve", status: "Ativo", prof: "Dr. Maria Santos", cor: "green" },
                { nome: "João Pedro", idade: "8 anos · TEA Moderado", status: "Ativo", prof: "Dr. Carlos Lima", cor: "green" },
                { nome: "Sofia Costa", idade: "5 anos · TEA Leve", status: "Ativo", prof: "Dra. Ana Oliveira", cor: "green" },
                { nome: "Lucas Ferreira", idade: "7 anos · TEA Severo", status: "Pausado", prof: "Dr. Pedro Rocha", cor: "gray" }
              ].map((c, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{c.nome}</span>
                      <span className={`bg-${c.cor}-100 text-${c.cor}-600 text-xs px-2 py-0.5 rounded-full`}>
                        {c.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">{c.idade}</div>
                    <div className="text-xs text-gray-400">Profissional: {c.prof}</div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Metas em andamento */}
          <div className="bg-white rounded-xl shadow-md border p-5">
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-semibold text-lg">Metas em Andamento</h2>
              <button className="bg-green-600 text-white px-4 py-1.5 rounded-full hover:bg-green-700 transition-colors text-sm font-medium">
                + Nova Meta
              </button>
            </div>

            <div className="space-y-5">
              {[
                { nome: "Ana Silva", progresso: 85, descricao: "Melhorar comunicação verbal", status: "Em andamento", cor: "blue" },
                { nome: "João Pedro", progresso: 60, descricao: "Desenvolver habilidades sociais", status: "Em andamento", cor: "blue" },
                { nome: "Sofia Costa", progresso: 92, descricao: "Reduzir comportamentos repetitivos", status: "Quase concluída", cor: "green" },
                { nome: "Lucas Ferreira", progresso: 45, descricao: "Aumentar tempo de atenção", status: "Em andamento", cor: "blue" }
              ].map((m, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{m.nome}</span>
                      <span className={`bg-${m.cor}-100 text-${m.cor}-600 text-xs px-2 py-0.5 rounded-full`}>
                        {m.status}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">{m.progresso}%</span>
                  </div>
                  <div className="text-sm text-gray-500">{m.descricao}</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${m.progresso}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
