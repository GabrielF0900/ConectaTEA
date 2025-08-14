import React from "react";

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      {/* Logo e título */}
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white text-2xl font-bold">
          C
        </div>
        <h1 className="mt-4 text-2xl font-bold text-gray-800">ConectaTEA</h1>
        <p className="mt-2 text-gray-600 max-w-md">
          Bem-vindo de volta! Acesse sua conta para continuar a jornada de apoio e crescimento.
        </p>
      </div>

      {/* Card de login */}
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-800">Entrar</h2>
        <p className="mt-1 text-center text-gray-500">
          Acesse sua conta ConectaTEA
        </p>

        <form className="mt-6 space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 flex items-center rounded-md border border-gray-300 bg-white px-3">
              <span className="text-gray-400 mr-2">📧</span>
              <input
                type="email"
                placeholder="seu@email.com"
                className="w-full border-0 p-2 focus:ring-0 focus:outline-none"
              />
            </div>
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <div className="mt-1 flex items-center rounded-md border border-gray-300 bg-white px-3">
              <span className="text-gray-400 mr-2">🔒</span>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border-0 p-2 focus:ring-0 focus:outline-none"
              />
              <button type="button" className="text-gray-400">👁</button>
            </div>
            <div className="mt-1 text-right">
              <a href="#" className="text-sm text-green-600 hover:underline">
                Esqueceu sua senha?
              </a>
            </div>
          </div>

          {/* Botão entrar */}
          <button
            type="submit"
            className="w-full rounded-md bg-green-600 py-2 text-white font-medium hover:bg-green-700 transition"
          >
            Entrar
          </button>

          {/* Divisor */}
          <div className="flex items-center">
            <span className="flex-1 h-px bg-gray-300"></span>
            <span className="px-2 text-gray-400 text-sm">ou</span>
            <span className="flex-1 h-px bg-gray-300"></span>
          </div>

          {/* Criar conta */}
          <button
            type="button"
            className="w-full rounded-md border border-gray-300 py-2 text-gray-700 font-medium hover:bg-gray-100 transition"
          >
            Criar nova conta
          </button>
        </form>
      </div>

      {/* Rodapé */}
      <p className="mt-6 text-center text-gray-500 text-sm max-w-md">
        Sua jornada de apoio começa aqui. Juntos, podemos fazer a diferença.
      </p>
    </div>
  );
}
