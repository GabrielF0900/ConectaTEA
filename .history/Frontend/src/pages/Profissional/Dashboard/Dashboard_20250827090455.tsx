import React from "react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Cards superiores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white shadow rounded-2xl p-6 flex flex-col items-center justify-center">
          <p className="text-2xl font-bold">24</p>
          <p className="text-gray-600">Total de Crianças</p>
          <span className="text-sm text-green-600">+2 este mês</span>
        </div>
        <div className="bg-white shadow rounded-2xl p-6 flex flex-col items-center justify-center">
          <p className="text-2xl font-bold">8</p>
          <p className="text-gray-600">Profissionais Ativos</p>
          <span className="text-sm text-green-600">+1 este mês</span>
        </div>
        <div className="bg-white shadow rounded-2xl p-6 flex flex-col items-center justify-center">
          <p className="text-2xl font-bold">47</p>
          <p className="text-gray-600">Metas Ativas</p>
          <span className="text-sm text-green-600">+5 esta semana</span>
        </div>
        <div className="bg-white shadow rounded-2xl p-6 flex flex-col items-center justify-center">
          <p className="text-2xl font-bold">78%</p>
          <p className="text-gray-600">Taxa de Progresso</p>
          <span className="text-sm text-green-600">+12% este mês</span>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Crianças Recentes */}
        <div className="bg-white shadow rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Crianças Recentes</h2>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
              + Adicionar
            </button>
          </div>

          <div className="space-y-4">
            {[
              { nome: "Ana Silva", idade: "6 anos", nivel: "TEA Leve", profissional: "Dr. Maria Santos", status: "Ativo" },
              { nome: "João Pedro", idade: "8 anos", nivel: "TEA Moderado", profissional: "Dr. Carlos Lima", status: "Ativo" },
              { nome: "Sofia Costa", idade: "5 anos", nivel: "TEA Leve", profissional: "Dra. Ana Oliveira", status: "Ativo" },
              { nome: "Lucas Ferreira", idade: "7 anos", nivel: "TEA Severo", profissional: "Dr. Pedro Rocha", status: "Pausado" },
            ].map((crianca, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-xl">
                <div>
                  <p className="font-semibold">{crianca.nome}</p>
                  <p className="text-sm text-gray-500">
                    {crianca.idade} · {crianca.nivel}
                  </p>
                  <p className="text-xs text-gray-400">Profissional: {crianca.profissional}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    crianca.status === "Ativo"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {crianca.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Metas em Andamento */}
        <div className="bg-white shadow rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Metas em Andamento</h2>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
              + Nova Meta
            </button>
          </div>

          <div className="space-y-6">
            {[
              { nome: "Ana Silva", meta: "Melhorar comunicação verbal", progresso: 85, status: "Em andamento" },
              { nome: "João Pedro", meta: "Desenvolver habilidades sociais", progresso: 60, status: "Em andamento" },
              { nome: "Sofia Costa", meta: "Reduzir comportamentos repetitivos", progresso: 92, status: "Quase concluída" },
              { nome: "Lucas Ferreira", meta: "Aumentar tempo de atenção", progresso: 45, status: "Em andamento" },
            ].map((meta, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <div>
                    <p className="font-semibold">{meta.nome}</p>
                    <p className="text-sm text-gray-500">{meta.meta}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        meta.status === "Quase concluída"
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {meta.status}
                    </span>
                    <p className="font-bold text-green-600">{meta.progresso}%</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{ width: `${meta.progresso}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
