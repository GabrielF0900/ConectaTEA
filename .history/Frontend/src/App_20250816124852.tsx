// src/App.tsx
import AppRoutes from "./routes/routes.tsx";
import Sidebar from "./pages/Profissional/Dashboard/Sidebar.tsx";
import Dashboard from "./pages/Profissional/Dashboard/Dashboard.tsx";
export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Barra lateral */}
      <Sidebar />
      {/* Rotas da aplicação */}
      <div className="flex-1">
        <AppRoutes />
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 overflow-y-auto p-6">
        <Dashboard />
      </div>
    </div>
  );
}
