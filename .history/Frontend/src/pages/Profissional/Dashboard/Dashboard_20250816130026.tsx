

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Acompanhe o progresso e gerencie as atividades</p>
        </div>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Ana Silva</span>
                  <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">Ativo</span>
                </div>
                <div className="text-sm text-gray-500">6 anos • TEA Leve</div>
                <div className="text-xs text-gray-400">Profissional: Dr. Maria Santos</div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 ml-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                </svg>
              </button>
            </div>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">João Pedro</span>
                  <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">Ativo</span>
                </div>
                <div className="text-sm text-gray-500">8 anos • TEA Moderado</div>
                <div className="text-xs text-gray-400">Profissional: Dr. Carlos Lima</div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 ml-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                </svg>
              </button>
            </div>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Sofia Costa</span>
                  <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">Ativo</span>
                </div>
                <div className="text-sm text-gray-500">5 anos • TEA Leve</div>
                <div className="text-xs text-gray-400">Profissional: Dr. Ana Oliveira</div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 ml-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                </svg>
              </button>
            </div>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Lucas Ferreira</span>
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">Pausado</span>
                </div>
                <div className="text-sm text-gray-500">7 anos • TEA Severo</div>
                <div className="text-xs text-gray-400">Profissional: Dr. Pedro Rocha</div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 ml-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                </svg>
              </button>
            </div>
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
            <div>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="font-semibold">Ana Silva</span>
                  <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded ml-2">Em andamento</span>
                </div>
                <span className="text-sm text-gray-500">85%</span>
              </div>
              <div className="text-sm text-gray-500 mb-2">Melhorar comunicação verbal</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="font-semibold">João Pedro</span>
                  <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded ml-2">Em andamento</span>
                </div>
                <span className="text-sm text-gray-500">60%</span>
              </div>
              <div className="text-sm text-gray-500 mb-2">Desenvolver habilidades sociais</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="font-semibold">Sofia Costa</span>
                  <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded ml-2">Quase concluída</span>
                </div>
                <span className="text-sm text-gray-500">92%</span>
              </div>
              <div className="text-sm text-gray-500 mb-2">Reduzir comportamentos repetitivos</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="font-semibold">Lucas Ferreira</span>
                  <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded ml-2">Em andamento</span>
                </div>
                <span className="text-sm text-gray-500">45%</span>
              </div>
              <div className="text-sm text-gray-500 mb-2">Aumentar tempo de atenção</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
