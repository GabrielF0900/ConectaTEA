// Barra lateral de navegação
export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r flex flex-col">
      {/* Logo e título */}
      <div className="flex items-center space-x-2 p-4 border-b">
        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
          C
        </div>
        <span className="font-semibold text-lg">ConectaTEA</span>
      </div>

      {/* Links do menu */}
      <nav className="flex-1 p-4 space-y-2">
        <a href="#" className="flex items-center p-2 rounded-lg bg-green-500 text-white font-medium">
          Dashboard
        </a>
        <a href="#" className="flex items-center p-2 rounded-lg hover:bg-gray-100">Crianças</a>
        <a href="#" className="flex items-center p-2 rounded-lg hover:bg-gray-100">Profissionais</a>
        <a href="#" className="flex items-center p-2 rounded-lg hover:bg-gray-100">Metas</a>
        <a href="#" className="flex items-center p-2 rounded-lg hover:bg-gray-100">Progresso</a>
        <a href="#" className="flex items-center p-2 rounded-lg hover:bg-gray-100">Sessões</a>
        <a href="#" className="flex items-center p-2 rounded-lg hover:bg-gray-100">Chat</a>
        <a href="#" className="flex items-center p-2 rounded-lg hover:bg-gray-100">IA</a>
        <a href="#" className="flex items-center p-2 rounded-lg hover:bg-gray-100">Configurações</a>
      </nav>

      {/* Botão de sair */}
      <div className="p-4">
        <button className="text-red-500 font-medium">Sair</button>
      </div>
    </aside>
  );
}
