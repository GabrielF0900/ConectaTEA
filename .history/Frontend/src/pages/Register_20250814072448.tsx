import React, { useState } from "react";

export default function Cadastro() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    tipoUsuario: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    // Aqui você pode integrar com seu backend
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      {/* Logo e título */}
      <div className="flex flex-col items-center mb-6">
        <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
          C
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mt-4">ConectaTEA</h1>
        <p className="text-center text-gray-600 max-w-sm">
          Crie sua conta para começar a transformar a vida das crianças autistas com amor e cuidado.
        </p>
      </div>

      {/* Formulário */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md"
      >
        <h2 className="text-xl font-bold text-center text-gray-800 mb-2">Criar Conta</h2>
        <p className="text-center text-gray-600 mb-6">
          Junte-se à comunidade ConectaTEA
        </p>

        {/* Nome */}
        <label className="block mb-2 font-medium text-gray-700">Nome Completo</label>
        <input
          type="text"
          name="nome"
          placeholder="Seu nome completo"
          value={form.nome}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        {/* Email */}
        <label className="block mb-2 font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          placeholder="seu@email.com"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        {/* Senha */}
        <label className="block mb-2 font-medium text-gray-700">Senha</label>
        <input
          type="password"
          name="senha"
          placeholder="********"
          value={form.senha}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        {/* Confirmar Senha */}
        <label className="block mb-2 font-medium text-gray-700">Confirmar Senha</label>
        <input
          type="password"
          name="confirmarSenha"
          placeholder="********"
          value={form.confirmarSenha}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        {/* Tipo de usuário */}
        <label className="block mb-2 font-medium text-gray-700">Tipo de Usuário</label>
        <select
          name="tipoUsuario"
          value={form.tipoUsuario}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="">Selecione o tipo de usuário</option>
          <option value="responsavel">Responsável (Pais/Cuidadores)</option>
          <option value="profissional">Profissional (Terapeutas/Psicólogos)</option>
        </select>

        {/* Botão Criar Conta */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Criar Conta
        </button>

        {/* Link já tem conta */}
        <p className="text-center text-gray-600 text-sm mt-4">
          Já tenho uma conta
        </p>
      </form>

      {/* Rodapé */}
      <p className="text-center text-gray-500 text-sm mt-6 max-w-xs">
        Sua jornada de apoio começa aqui. Juntos, podemos fazer a diferença.
      </p>
    </div>
  );
}
