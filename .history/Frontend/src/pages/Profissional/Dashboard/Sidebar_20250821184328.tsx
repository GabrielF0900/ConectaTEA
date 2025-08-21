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
          className={`flex items-center px-4 py-2 rounded-lg font-medium ${
            location.pathname === '/profissional/criancas' 
              ? 'text-white bg-green-500' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Crianças
        </Link>
        <Link 
          to="/profissional/profissionais" 
          className={`flex items-center px-4 py-2 rounded-lg font-medium ${
            location.pathname === '/profissional/profissionais' 
              ? 'text-white bg-green-500' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Profissionais
        </Link>
        <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Metas</a>
        <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Progresso</a>
        <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Sessões</a>
        <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Chat</a>
        <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">IA</a>
        <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Configurações</a>
      </nav>

      {/* Botão sair */}
      <div className="px-4 py-4 border-t">
        <a href="#" className="text-red-500 font-medium">Sair</a>
      </div>
    </aside>
  );
};

export default Sidebar;
