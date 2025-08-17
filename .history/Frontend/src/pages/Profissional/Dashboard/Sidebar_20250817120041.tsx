// src/components/Sidebar.tsx
import React from "react";




const Sidebar: React.FC = () => {
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
        <a href="#" className="flex items-center px-4 py-2 text-white bg-green-500 rounded-lg font-medium">
          Dashboard
        </a>
        <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Crianças</a>
        <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Profissionais</a>
        <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Metas</a>
        <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Progresso</a>
        <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Sessões</a>
        <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Chat</a>
        <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">IA</a>
        <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Configurações</a>
      </nav>

      {/* Botão sair */}
      <div className="px-4 py-4 border-t">
        <a href="#" className="text-red-500 font-medium">Sair</a>
      </div>
    </aside>
  );
};

export default Sidebar;
