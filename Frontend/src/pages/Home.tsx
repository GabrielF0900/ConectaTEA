// src/pages/Home.tsx
export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          ConectaTEA 🧩
        </h1>
        <p className="text-gray-600 mb-6">
          Sistema de gerenciamento e acompanhamento para crianças com TEA
        </p>
        <div className="space-y-3">
          <a 
            href="/login" 
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Fazer Login
          </a>
          <a 
            href="/register" 
            className="block w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Criar Conta
          </a>
        </div>
      </div>
    </div>
  );
}
