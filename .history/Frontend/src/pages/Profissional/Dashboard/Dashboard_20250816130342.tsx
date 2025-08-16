export default function Dashboard() {
  return (
    <div className="space-y-6 p-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Acompanhe o progresso e gerencie as atividades</p>
        </div>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white rounded-lg shadow-sm border p-4 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Total de Crianças</span>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
          <span className="text-3xl font-bold mb-1">24</span>
          <span className="text-xs text-gray-400">+2 este mês</span>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-lg shadow-sm border p-4 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Profissionais Ativos</span>
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
          <span className="text-3xl font-bold mb-1">8</span>
          <span className="text-xs text-gray-400">+1 este mês</span>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-lg shadow-sm border p-4 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Metas Ativas</span>
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
          <span className="text-3xl font-bold mb-1">47</span>
          <span className="text-xs text-gray-400">+5 esta semana</span>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-lg shadow-sm border p-4 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Taxa de Progresso</span>
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
          <span className="text-3xl font-bold mb-1">78%</span>
          <span className="text-xs text-gray-400">+12% este mês</span>
        </div>
      </div>

      {/* Listas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Crianças Recentes */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Crianças Recentes</h2>
            <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-medium flex items-center gap-1">
              + Adicionar
            </button>
          </div>

          <div className="space-y-3">
            {[
              { nome: "Ana Silva", idade: "6 anos • TEA Leve", status: "Ativo", prof: "Dr. Maria Santos", cor: "green" },
              { nome: "João Pedro", idade: "8 anos • TEA Moderado", status: "Ativo", prof: "Dr. Carlos Lima", cor: "green" },
              { nome: "Sofia Costa", idade: "5 anos • TEA Leve", status: "Ativo", prof: "Dr. Ana Oliveira", cor: "green" },
              { nome: "Lucas Ferreira", idade: "7 anos • TEA Severo", status: "Pausado", prof: "Dr. Pedro Rocha", cor: "gray" }
            ].map((crianca, i) => (
              <div key={i} className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{crianca.nome}</span>
                    <span className={`bg-${crianca.cor}-100 text-${crianca.cor}-600 text-xs px-2 py-1 rounded`}>
                      {crianca.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">{crianca.idade}</div>
                  <div className="text-xs text-gray-400">Profissional: {crianca.prof}</div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 ml-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Metas em Andamento */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Metas em Andamento</h2>
            <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-medium flex items-center gap-1">
              + Nova Meta
            </button>
          </div>

          <div className="space-y-4">
            {[
              { nome: "Ana Silva", progresso: 85, descricao: "Melhorar comunicação verbal", status: "Em andamento", cor: "blue" },
              { nome: "João Pedro", progresso: 60, descricao: "Desenvolver habilidades sociais", status: "Em andamento", cor: "blue" },
              { nome: "Sofia Costa", progresso: 92, descricao: "Reduzir comportamentos repetitivos", status: "Quase concluída", cor: "green" },
              { nome: "Lucas Ferreira", progresso: 45, descricao: "Aumentar tempo de atenção", status: "Em andamento", cor: "blue" }
            ].map((meta, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-semibold">{meta.nome}</span>
                    <span className={`bg-${meta.cor}-100 text-${meta.cor}-600 text-xs px-2 py-1 rounded ml-2`}>
                      {meta.status}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{meta.progresso}%</span>
                </div>
                <div className="text-sm text-gray-500 mb-2">{meta.descricao}</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${meta.progresso}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
