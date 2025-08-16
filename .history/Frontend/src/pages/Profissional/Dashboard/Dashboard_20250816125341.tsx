export default function Dashboard() {
  return null; // Placeholder for future content
}
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-500">Profissionais Ativos</p>
          <h2 className="text-2xl font-bold">8</h2>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-500">Metas Ativas</p>
          <h2 className="text-2xl font-bold">47</h2>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-500">Taxa de Progresso</p>
          <h2 className="text-2xl font-bold">78%</h2>
        </div>
      </section>

      {/* Listas (Crianças e Metas) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Crianças recentes */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Crianças Recentes</h3>
            <button className="bg-green-500 text-white px-3 py-1 rounded">Adicionar</button>
          </div>

          <ul className="space-y-3">
            <li className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Ana Silva</p>
                <p className="text-sm text-gray-500">6 anos • TEA Leve</p>
              </div>
              <span className="text-green-600 text-sm font-medium">Ativo</span>
            </li>
            <li className="flex justify-between items-center">
              <div>
                <p className="font-semibold">João Pedro</p>
                <p className="text-sm text-gray-500">8 anos • TEA Moderado</p>
              </div>
              <span className="text-green-600 text-sm font-medium">Ativo</span>
            </li>
          </ul>
        </div>

        {/* Metas em andamento */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Metas em Andamento</h3>
            <button className="bg-green-500 text-white px-3 py-1 rounded">Nova Meta</button>
          </div>

          <ul className="space-y-4">
            <li>
              <p className="font-semibold">Ana Silva</p>
              <p className="text-sm text-gray-500">Melhorar comunicação verbal</p>
              <div className="w-full bg-gray-200 rounded h-2 mt-2">
                <div className="bg-green-500 h-2 rounded w-[85%]"></div>
              </div>
            </li>
            <li>
              <p className="font-semibold">João Pedro</p>
              <p className="text-sm text-gray-500">Desenvolver habilidades sociais</p>
              <div className="w-full bg-gray-200 rounded h-2 mt-2">
                <div className="bg-green-500 h-2 rounded w-[60%]"></div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
