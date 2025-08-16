import {useEffect, useState} from "react"



type Usuario = { nome: string } | null; //Tipando o usuario e colocando como String

export default function Dashboard() {
  const [usuario, setUsuario] = useState<Usuario>(null);

    useEffect(() => {
      //Pegando o dado (nome) do banco de dados para exibir.
      const dadosSalvos = localStorage.getItem("token");

      if(dadosSalvos) {
        setUsuario(JSON.parse(dadosSalvos));
      }
    }, [])



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com barra de pesquisa */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-500">Acompanhe o progresso e gerencie as atividades</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Barra de pesquisa */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="block w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            {/* Notificações */}
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v18H3V3h6z" />
              </svg>
            </button>
            {/* Usuário */}
            <div className="flex items-center gap-2">
              <span className="font-semibold">{usuario?.nome ?? "Usuário"}</span>
              <span className="px-2 py-1 text-sm bg-green-100 text-green-600 rounded">Profissional</span>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="p-6 space-y-6">
        {/* Cards de resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-sm border p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Total de Crianças</span>
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
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
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
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
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
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
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
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
    </div>
  );
}
