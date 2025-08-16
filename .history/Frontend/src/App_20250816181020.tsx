// src/App.tsx
import { useLocation } from 'react-router-dom';
import AppRoutes from "./routes/routes.tsx";
import Sidebar from "./pages/Profissional/Dashboard/Sidebar.tsx";

export default function App() {
  const location = useLocation();
  
  console.log("App.tsx - Rota atual:", location.pathname);
  
  // Rotas que não devem mostrar o sidebar
  const publicRoutes = ['/', '/login', '/register'];
  const shouldShowSidebar = !publicRoutes.includes(location.pathname);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar só aparece em rotas protegidas */}
      {shouldShowSidebar && <Sidebar />}
      
      {/* Conteúdo principal */}
      <div className={shouldShowSidebar ? "flex-1" : "w-full"}>
        <AppRoutes />
      </div>
    </div>
  );
}
