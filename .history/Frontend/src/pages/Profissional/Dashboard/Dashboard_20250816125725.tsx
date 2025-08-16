

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Acompanhe o progresso e gerencie as atividades</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">Dr. Maria Silva</span>
          <span className="px-2 py-1 text-sm bg-green-100 text-green-600 rounded">Profissional</span>
        </div>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border p-6 flex flex-col gap-1 shadow-sm">
          <span className="text-gray-500 text-sm">Total de Crianças</span>
          <span className="text-3xl font-bold">24</span>
          <span className="text-xs text-gray-400">+2 este mês</span>
        </div>
        <div className="bg-white rounded-xl border p-6 flex flex-col gap-1 shadow-sm">
          <span className="text-gray-500 text-sm">Profissionais Ativos</span>
          <span className="text-3xl font-bold">8</span>
          <span className="text-xs text-gray-400">+1 este mês</span>
        </div>
        <div className="bg-white rounded-xl border p-6 flex flex-col gap-1 shadow-sm">
          <span className="text-gray-500 text-sm">Metas Ativas</span>
          <span className="text-3xl font-bold">47</span>
          <span className="text-xs text-gray-400">+5 esta semana</span>
        </div>
        <div className="bg-white rounded-xl border p-6 flex flex-col gap-1 shadow-sm">
          <span className="text-gray-500 text-sm">Taxa de Progresso</span>
          <span className="text-3xl font-bold">78%</span>
          <span className="text-xs text-gray-400">+12% este mês</span>
        </div>
      </div>

      {/* Listas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Crianças Recentes */}
        <div className="bg-white rounded-xl border p-6 shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-lg">Crianças Recentes</h2>
            <button className="bg-green-500 text-white px-4 py-1 rounded flex items-center gap-1 text-sm font-medium">+ Adicionar</button>
          </div>
          <div className="flex flex-col gap-3">
            <div className="bg-gray-50 rounded-lg p-3 flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold">Ana Silva</span>
                  <span className="ml-2 text-xs text-gray-500">6 anos • TEA Leve</span>
                </div>
                <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded">Ativo</span>
              </div>
              <span className="text-xs text-gray-400">Profissional: Dr. Maria Santos</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold">João Pedro</span>
                  <span className="ml-2 text-xs text-gray-500">8 anos • TEA Moderado</span>
                </div>
                <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded">Ativo</span>
              </div>
              <span className="text-xs text-gray-400">Profissional: Dr. Carlos Lima</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold">Sofia Costa</span>
                  <span className="ml-2 text-xs text-gray-500">5 anos • TEA Leve</span>
                </div>
                <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded">Ativo</span>
              </div>
              <span className="text-xs text-gray-400">Profissional: Dr. Ana Oliveira</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold">Lucas Ferreira</span>
                  <span className="ml-2 text-xs text-gray-500">7 anos • TEA Severo</span>
                </div>
                <span className="bg-gray-200 text-gray-500 text-xs px-2 py-0.5 rounded">Pausado</span>
              </div>
              <span className="text-xs text-gray-400">Profissional: Dr. Pedro Rocha</span>
            </div>
          </div>
        </div>

        {/* Metas em Andamento */}
        <div className="bg-white rounded-xl border p-6 shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-lg">Metas em Andamento</h2>
            <button className="bg-green-500 text-white px-4 py-1 rounded flex items-center gap-1 text-sm font-medium">+ Nova Meta</button>
          </div>
          <div className="flex flex-col gap-3">
            <div className="bg-gray-50 rounded-lg p-3 flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold">Ana Silva</span>
                  <span className="ml-2 text-xs text-gray-500">Melhorar comunicação verbal</span>
                </div>
                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded">Em andamento</span>
              </div>
              <div className="w-full bg-gray-200 rounded h-2 mt-2">
                <div className="bg-green-500 h-2 rounded" style={{ width: '85%' }}></div>
              </div>
              <div className="flex justify-end">
                <span className="text-xs text-gray-500">85%</span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold">João Pedro</span>
                  <span className="ml-2 text-xs text-gray-500">Desenvolver habilidades sociais</span>
                </div>
                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded">Em andamento</span>
              </div>
              <div className="w-full bg-gray-200 rounded h-2 mt-2">
                <div className="bg-green-500 h-2 rounded" style={{ width: '60%' }}></div>
              </div>
              <div className="flex justify-end">
                <span className="text-xs text-gray-500">60%</span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold">Sofia Costa</span>
                  <span className="ml-2 text-xs text-gray-500">Reduzir comportamentos repetitivos</span>
                </div>
                <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded">Quase concluída</span>
              </div>
              <div className="w-full bg-gray-200 rounded h-2 mt-2">
                <div className="bg-green-500 h-2 rounded" style={{ width: '92%' }}></div>
              </div>
              <div className="flex justify-end">
                <span className="text-xs text-gray-500">92%</span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold">Lucas Ferreira</span>
                  <span className="ml-2 text-xs text-gray-500">Aumentar tempo de atenção</span>
                </div>
                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded">Em andamento</span>
              </div>
              <div className="w-full bg-gray-200 rounded h-2 mt-2">
                <div className="bg-green-500 h-2 rounded" style={{ width: '45%' }}></div>
              </div>
              <div className="flex justify-end">
                <span className="text-xs text-gray-500">45%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
