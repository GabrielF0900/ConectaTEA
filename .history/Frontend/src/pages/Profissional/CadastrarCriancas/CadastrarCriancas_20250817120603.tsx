import React, { useState } from "react";

interface Crianca {
  id: number;
  nome: string;
  idade: number;
  diagnostico: string;
  responsavel: string;
  profissional: string;
  ultimaSessao: string;
  status: string;
}

const childrenSample: Crianca[] = [
  {
    id: 1,
    nome: "Ana Silva",
    idade: 6,
    diagnostico: "TEA Leve",
    responsavel: "Maria Silva",
    profissional: "Dr. João Santos",
    ultimaSessao: "09/01/2024",
    status: "Ativo",
  },
  {
    id: 2,
    nome: "Pedro Costa",
    idade: 8,
    diagnostico: "TEA Moderado",
    responsavel: "Carlos Costa",
    profissional: "Dra. Ana Lima",
    ultimaSessao: "08/01/2024",
    status: "Ativo",
  },
  {
    id: 3,
    nome: "Sofia Rodrigues",
    idade: 5,
    diagnostico: "TEA Leve",
    responsavel: "Laura Rodrigues",
    profissional: "Dr. Paulo Mendes",
    ultimaSessao: "07/01/2024",
    status: "Ativo",
  },
];

export default function CadastrarCriancas() {
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Filtro para busca das crianças
  const filtered = childrenSample.filter((c) =>
    c.nome.toLowerCase().includes(query.toLowerCase()) ||
    c.responsavel.toLowerCase().includes(query.toLowerCase()) ||
    c.diagnostico.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Crianças</h1>
            <p className="text-gray-600">Gerencie as crianças cadastradas no sistema</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar crianças..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent w-80"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button className="flex items-center gap-2 text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              Filtros
            </button>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Dr. Maria Silva</span>
              <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">PROFISSIONAL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Actions Bar */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowModal(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nova Criança
            </button>
            <span className="text-gray-600">
              {filtered.length} {filtered.length === 1 ? 'criança encontrada' : 'crianças encontradas'}
            </span>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-4">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-lg border p-12 text-center">
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-7.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma criança encontrada</h3>
              <p className="text-gray-600 mb-4">
                {query ? 'Tente ajustar sua busca' : 'Comece adicionando uma nova criança'}
              </p>
              {!query && (
                <button 
                  onClick={() => setShowModal(true)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium"
                >
                  Adicionar Primeira Criança
                </button>
              )}
            </div>
          ) : (
            filtered.map((crianca) => (
              <div key={crianca.id} className="bg-white rounded-lg border hover:shadow-md transition-shadow p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{crianca.nome}</h3>
                      <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                        {crianca.idade} anos
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        crianca.status === 'Ativo' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {crianca.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Diagnóstico:</span>
                        <p className="text-gray-600">{crianca.diagnostico}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Responsável:</span>
                        <p className="text-gray-600">{crianca.responsavel}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Profissional:</span>
                        <p className="text-gray-600">{crianca.profissional}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Última Sessão:</span>
                        <p className="text-gray-600">{crianca.ultimaSessao}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal Placeholder */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">Adicionar Nova Criança</h2>
            <p className="text-gray-600 mb-4">Funcionalidade em desenvolvimento...</p>
            <button 
              onClick={() => setShowModal(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

  // Filtro para busca das crianças
  const filtered = childrenSample.filter((c) =>
    c.nome.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Topbar para mobile */}
      <header className="md:hidden bg-white shadow-sm">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((s) => !s)}
              aria-label="Abrir menu"
              className="p-2 rounded-md hover:bg-gray-100"
            >
              {/* Ícone de menu hamburguer */}
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">C</div>
              <span className="font-semibold">ConectaTEA</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar..."
              className="px-3 py-1 border rounded-md text-sm w-36 md:w-64"
            />
            <div className="flex items-center gap-2">
              <div className="text-sm text-gray-600">Dr. Maria Silva</div>
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">MS</div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Barra lateral (Sidebar) */}
        <aside
          className={`fixed top-0 left-0 z-20 h-full w-64 bg-white border-r transform md:translate-x-0 transition-transform shadow-sm ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">C</div>
              <div>
                <div className="font-semibold">ConectaTEA</div>
                <div className="text-xs text-gray-500">Painel</div>
              </div>
            </div>

            <nav className="mt-6 space-y-1">
              {[
                "Dashboard",
                "Crianças",
                "Profissionais",
                "Metas",
                "Progresso",
                "Sessões",
                "Chat",
                "IA",
                "Configurações",
              ].map((item) => (
                <a
                  key={item}
                  href="#"
                  className={`flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-100 text-sm ${
                    item === "Crianças" ? "bg-green-50 text-green-600 font-medium" : "text-gray-700"
                  }`}
                >
                  <span className="truncate">{item}</span>
                </a>
              ))}
            </nav>

            <div className="mt-6 text-sm text-red-600">
              <button className="flex items-center gap-2">Sair</button>
            </div>
          </div>
        </aside>

        {/* Conteúdo principal (move para direita quando a sidebar abre no desktop) */}
        <main className="flex-1 md:ml-64">
          {/* Topbar para desktop */}
          <div className="hidden md:flex items-center justify-between bg-white p-6 border-b">
            <div>
              <h1 className="text-2xl font-semibold">Crianças</h1>
              <p className="text-sm text-gray-500">Gerencie as crianças cadastradas no sistema</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar crianças..."
                  className="px-4 py-2 border rounded-full w-80 text-sm"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 rounded-md bg-green-500 text-white text-sm">🔍</button>
              </div>
              <button className="px-4 py-2 bg-green-500 text-white rounded-md">+ Nova Criança</button>
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-600">Dr. Maria Silva</div>
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">MS</div>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Filtros e campo de busca no mobile */}
            <div className="flex items-center justify-between mb-6 md:hidden">
              <div className="flex items-center gap-2">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar crianças..."
                  className="px-3 py-2 border rounded-md text-sm w-48"
                />
                <button className="px-3 py-2 border rounded-md text-sm">Filtros</button>
              </div>
              <button className="px-3 py-2 bg-green-500 text-white rounded-md">+ Nova Criança</button>
            </div>

            {/* Lista de cartões das crianças */}
            <div className="space-y-6">
              {filtered.map((c) => (
                <article
                  key={c.id}
                  className="bg-white border rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">{c.nome.split(" ")[0][0]}</div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h2 className="text-lg font-semibold">{c.nome}</h2>
                        <span className="px-2 py-0.5 text-xs bg-gray-100 rounded-md">{c.status}</span>
                      </div>

                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                        <div>Idade: <span className="text-gray-800 font-medium">{c.idade} anos</span></div>
                        <div>Diagnóstico: <span className="text-gray-800 font-medium">{c.diagnostico}</span></div>
                        <div>Responsável: <span className="text-gray-800 font-medium">{c.responsavel}</span></div>
                        <div>Profissional: <span className="text-gray-800 font-medium">{c.profissional}</span></div>
                        <div>Última sessão: <span className="text-gray-800 font-medium">{c.ultimaSessao}</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 flex items-center gap-3 self-end md:self-center">
                    <button className="px-3 py-2 border rounded-md text-sm">Ver Detalhes</button>
                    <button className="px-3 py-2 border rounded-md text-sm">Editar</button>
                  </div>
                </article>
              ))}

              {filtered.length === 0 && (
                <div className="text-center text-gray-500 py-10">Nenhuma criança encontrada.</div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Overlay de fundo quando sidebar aberta no mobile */}
      {sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-10 bg-black/30 md:hidden"
          aria-hidden
        />
      )}
    </div>
  );
}
