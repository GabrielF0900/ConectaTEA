import React, { useState } from "react";

// ConectaTEA Dashboard - Single-file React component using TailwindCSS
// Usage: paste this file into your project (e.g. src/ConectaTEA.jsx) and import in App.jsx
// Requires Tailwind configured in the project.

const childrenSample = [
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
  // add more items to test grid
];

export default function ConectaTEADashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = childrenSample.filter((c) =>
    c.nome.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Topbar for mobile */}
      <header className="md:hidden bg-white shadow-sm">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((s) => !s)}
              aria-label="Abrir menu"
              className="p-2 rounded-md hover:bg-gray-100"
            >
              {/* hamburger */}
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
        {/* Sidebar */}
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
                  {item === "Sair" ? null : null}
                </a>
              ))}
            </nav>

            <div className="mt-6 text-sm text-red-600">
              <button className="flex items-center gap-2">Sair</button>
            </div>
          </div>
        </aside>

        {/* Main content (push right when sidebar open on md) */}
        <main className="flex-1 md:ml-64">
          {/* Desktop topbar */}
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
            {/* Filters and small search on mobile */}
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

            {/* Card list */}
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

      {/* Responsiveness helper: overlay when sidebar open on mobile */}
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
