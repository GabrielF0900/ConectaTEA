// src/components/Sidebar.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Grid, Smile, Users, Target, TrendingUp, Calendar, MessageCircle, Cpu, User, Settings } from "lucide-react";
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
          className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${
            location.pathname === '/profissional/dashboard'
              ? 'text-white bg-green-500'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Grid className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/profissional/criancas"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${
            location.pathname === '/profissional/criancas'
              ? 'text-white bg-green-500'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Smile className="w-5 h-5" />
          <span>Crianças</span>
        </Link>

        <Link
          to="/profissional/profissionais"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${
            location.pathname === '/profissional/profissionais'
              ? 'text-white bg-green-500'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Users className="w-5 h-5" />
          <span>Profissionais</span>
        </Link>

        <Link
          to="/profissional/metas"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${
            location.pathname === '/profissional/metas' ? 'text-white bg-green-500' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Target className="w-5 h-5" />
          <span>Metas</span>
        </Link>

        <Link
          to="#progresso"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${
            location.hash === '#progresso' ? 'text-white bg-green-500' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <TrendingUp className="w-5 h-5" />
          <span>Progresso</span>
        </Link>

        <Link
          to="#sessoes"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${
            location.hash === '#sessoes' ? 'text-white bg-green-500' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span>Sessões</span>
        </Link>

        <Link
          to="#chat"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${
            location.hash === '#chat' ? 'text-white bg-green-500' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <MessageCircle className="w-5 h-5" />
          <span>Chat</span>
        </Link>

        <Link
          to="#ia"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${
            location.hash === '#ia' ? 'text-white bg-green-500' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Cpu className="w-5 h-5" />
          <span>IA</span>
        </Link>

        <Link
          to="/profissional/perfil"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${
            location.pathname === '/profissional/perfil' ? 'text-white bg-green-500' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <User className="w-5 h-5" />
          <span>Perfil</span>
        </Link>

        <Link
          to="/profissional/configuracoes"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${
            location.pathname === '/profissional/configuracoes' ? 'text-white bg-green-500' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span>Configurações</span>
        </Link>
      </nav>

      {/* Botão sair */}
      <div className="px-4 py-4 border-t">
        <a href="#" className="text-red-500 font-medium">Sair</a>
      </div>
    </aside>
  );
};

export default Sidebar;
