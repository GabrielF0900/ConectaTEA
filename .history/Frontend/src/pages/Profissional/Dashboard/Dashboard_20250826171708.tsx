
import { useEffect, useState } from "react";

type Role = { UserType: string } | null;
type Usuario = { nome: string } | null;

export default function Dashboard() {
  const [usuario, setUsuario] = useState<Usuario>(null);
  const [role, setRole] = useState<Role>(null);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUsuario({ nome: user.name || user.nome || "Usuário" });
        setRole({ UserType: user.tipo || "Usuário" });
      } catch (error) {
        setUsuario({ nome: "Usuário" });
        setRole({ UserType: "Usuário" });
      }
    }
  }, []);

  return (
    <div className="h-full bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-8 py-4 sticky top-0 z-30 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Acompanhe o progresso e gerencie as atividades</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar..."
              className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <button className="relative p-2 text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="18" cy="6" r="3" fill="#22c55e" stroke="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v18H3V3h6z" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="relative">
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="flex items-center gap-3 focus:outline-none"
              aria-haspopup="true"
              aria-expanded={openMenu}
            >
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" className="w-9 h-9 rounded-full border" />
              <div className="text-left">
                <div className="font-semibold">{usuario?.nome ?? "Usuário"}</div>
                <div className="text-xs text-green-600 font-bold">PROFISSIONAL</div>
              </div>
              <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.12 1l-4.25 4.65a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
            {openMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-50">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50" onClick={() => setOpenMenu(false)}>
                  <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 100 12A6 6 0 0010 2z"/></svg>
                  Ver Perfil
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50" onClick={() => setOpenMenu(false)}>
                  <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path d="M6 2a1 1 0 000 2h8a1 1 0 100-2H6z"/></svg>
                  Configurações
                </button>
                <div className="border-t" />
                <button
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
                  onClick={() => {
                    setOpenMenu(false);
                    localStorage.clear();
                    window.location.href = '/login';
                  }}
                >Sair</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cards de resumo */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl shadow-md border p-6 flex flex-col items-start min-h-[140px]">
          <span className="text-3xl font-bold mb-1">24</span>
          <span className="text-gray-700 font-medium">Total de Crianças</span>
          <span className="text-xs text-gray-400 mt-1">+2 este mês</span>
        </div>
        {/* Card 2 */}
        <div className="bg-white rounded-2xl shadow-md border p-6 flex flex-col items-start min-h-[140px]">
          <span className="text-3xl font-bold mb-1">8</span>
          <span className="text-gray-700 font-medium">Profissionais Ativos</span>
          <span className="text-xs text-gray-400 mt-1">+1 este mês</span>
        </div>
        {/* Card 3 */}
        <div className="bg-white rounded-2xl shadow-md border p-6 flex flex-col items-start min-h-[140px]">
          <span className="text-3xl font-bold mb-1">47</span>
          <span className="text-gray-700 font-medium">Metas Ativas</span>
          <span className="text-xs text-gray-400 mt-1">+5 esta semana</span>
        </div>
        {/* Card 4 */}
        <div className="bg-white rounded-2xl shadow-md border p-6 flex flex-col items-start min-h-[140px]">
          <span className="text-3xl font-bold mb-1">78%</span>
          <span className="text-gray-700 font-medium">Taxa de Progresso</span>
          <span className="text-xs text-gray-400 mt-1">+12% este mês</span>
        </div>
      </div>

      {/* Listas */}
      <div className="px-8 pb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Crianças Recentes */}
        <div className="bg-white rounded-2xl shadow-md border p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Crianças Recentes</h2>
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-1">
              + Adicionar
            </button>
          </div>
          <div className="space-y-4">
            {/* Lista fixa igual ao print */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=Ana" alt="Ana Silva" className="w-12 h-12 rounded-full" />
                <div>
                  <div className="font-semibold">Ana Silva</div>
                  <div className="text-sm text-gray-500">6 anos • TEA Leve</div>
                  <div className="text-xs text-gray-400">Profissional: Dr. Maria Santos</div>
                </div>
              </div>
              <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded">Ativo</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=Joao" alt="João Pedro" className="w-12 h-12 rounded-full" />
                <div>
                  <div className="font-semibold">João Pedro</div>
                  <div className="text-sm text-gray-500">8 anos • TEA Moderado</div>
                  <div className="text-xs text-gray-400">Profissional: Dr. Carlos Lima</div>
                </div>
              </div>
              <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded">Ativo</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=Sofia" alt="Sofia Costa" className="w-12 h-12 rounded-full" />
                <div>
                  <div className="font-semibold">Sofia Costa</div>
                  <div className="text-sm text-gray-500">5 anos • TEA Leve</div>
                  <div className="text-xs text-gray-400">Profissional: Dra. Ana Oliveira</div>
                </div>
              </div>
              <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded">Ativo</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=Lucas" alt="Lucas Ferreira" className="w-12 h-12 rounded-full" />
                <div>
                  <div className="font-semibold">Lucas Ferreira</div>
                  <div className="text-sm text-gray-500">7 anos • TEA Severo</div>
                  <div className="text-xs text-gray-400">Profissional: Dr. Pedro Rocha</div>
                </div>
              </div>
              <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded">Pausado</span>
            </div>
          </div>
        </div>
        {/* Metas em Andamento */}
        <div className="bg-white rounded-2xl shadow-md border p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Metas em Andamento</h2>
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-1">
              + Nova Meta
            </button>
          </div>
          <div className="space-y-4">
            {/* Lista fixa igual ao print */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="font-semibold">Ana Silva</div>
                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">Em andamento</span>
                <span className="font-bold text-green-700 text-lg">85%</span>
              </div>
              <div className="text-sm text-gray-500 mb-1">Melhorar comunicação verbal</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `85%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="font-semibold">João Pedro</div>
                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">Em andamento</span>
                <span className="font-bold text-green-700 text-lg">60%</span>
              </div>
              <div className="text-sm text-gray-500 mb-1">Desenvolver habilidades sociais</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `60%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="font-semibold">Sofia Costa</div>
                <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">Quase concluída</span>
                <span className="font-bold text-green-700 text-lg">92%</span>
              </div>
              <div className="text-sm text-gray-500 mb-1">Reduzir comportamentos repetitivos</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `92%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="font-semibold">Lucas Ferreira</div>
                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">Em andamento</span>
                <span className="font-bold text-green-700 text-lg">45%</span>
              </div>
              <div className="text-sm text-gray-500 mb-1">Aumentar tempo de atenção</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `45%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
