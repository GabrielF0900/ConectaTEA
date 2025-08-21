// src/components/Sidebar.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r hidden md:flex flex-col">
      {/* Logo e título */}
      <div className="flex items-center gap-2 px-6 py-4 border-b">
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
          C
        </div>
        <span className="font-semibold text-gray-700">ConectaTEA</span>
      </div>

      {/* Menu lateral */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <Link 
          to="/profissional/dashboard" 
          className={`flex items-center px-4 py-2 rounded-lg font-medium ${
            location.pathname === '/profissional/dashboard' 
              ? 'text-white bg-green-500' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Dashboard
        </Link>
        <Link 
          to="/profissional/criancas" 
          className={`block px-4 py-2 rounded-lg ${
            location.pathname === '/profissional/criancas' 
              ? 'text-white bg-green-500 font-medium' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Crianças
        </Link>

        <Link 
          to="/profissional/profissionais" 
          className={`block px-4 py-2 rounded-lg ${
            location.pathname === '/profissional/profissionais' 
              ? 'text-white bg-green-500 font-medium' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Profissionais
        </Link>
        <Link 
          to="/profissional/metas" 
          className={`block px-4 py-2 rounded-lg ${
            location.pathname === '/profissional/metas' 
              ? 'text-white bg-green-500 font-medium' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Metas
        </Link>
        <Link 
          to="/profissional/progresso" 
          className={`block px-4 py-2 rounded-lg ${
            location.pathname === '/profissional/progresso' 
              ? 'text-white bg-green-500 font-medium' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Progresso
        </Link>
        <Link 
          to="/profissional/sessoes" 
          className={`block px-4 py-2 rounded-lg ${
            location.pathname === '/profissional/sessoes' 
              ? 'text-white bg-green-500 font-medium' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Sessões
        </Link>
        <Link 
          to="/profissional/chat" 
          className={`block px-4 py-2 rounded-lg ${
            location.pathname === '/profissional/chat' 
              ? 'text-white bg-green-500 font-medium' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Chat
        </Link>
        <Link 
          to="/profissional/ia" 
          className={`block px-4 py-2 rounded-lg ${
            location.pathname === '/profissional/ia' 
              ? 'text-white bg-green-500 font-medium' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          IA
        </Link>
        <Link 
          to="/profissional/configuracoes" 
          className={`block px-4 py-2 rounded-lg ${
            location.pathname === '/profissional/configuracoes' 
              ? 'text-white bg-green-500 font-medium' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Configurações
        </Link>
      </nav>

      {/* Botão sair */}
      <div className="px-4 py-4 border-t">
        <Link to="#" className="text-red-500 font-medium">Sair</Link>
      </div>
    </aside>
  );
};

export default Sidebar;
