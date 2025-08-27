// Dashboard.tsx
import { Bell, Search } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Acompanhe suas métricas em tempo real</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell size={22} className="text-gray-600" />
          </button>
          <img
            src="https://via.placeholder.com/40"
            alt="Avatar"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Cards principais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-sm font-semibold text-gray-500">Usuários ativos</h2>
            <p className="text-2xl font-bold mt-2">1,234</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-sm font-semibold text-gray-500">Novos cadastros</h2>
            <p className="text-2xl font-bold mt-2">342</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-sm font-semibold text-gray-500">Vendas</h2>
            <p className="text-2xl font-bold mt-2">R$ 12.300</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-sm font-semibold text-gray-500">Taxa de retorno</h2>
            <p className="text-2xl font-bold mt-2">72%</p>
          </div>
        </div>

        {/* Seções */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gráfico / Estatísticas */}
          <div className="bg-white p-6 rounded-xl shadow lg:col-span-2">
            <h2 className="text-lg font-bold mb-4">Visão geral</h2>
            <div className="h-64 flex items-center justify-center text-gray-400">
              📊 Gráfico (placeholder)
            </div>
          </div>

          {/* Atividades recentes */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-bold mb-4">Atividades recentes</h2>
            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <span className="text-gray-600">Novo usuário cadastrado</span>
                <span className="text-sm text-gray-400">2 min atrás</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-gray-600">Venda realizada</span>
                <span className="text-sm text-gray-400">15 min atrás</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-gray-600">Servidor atualizado</span>
                <span className="text-sm text-gray-400">1h atrás</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
