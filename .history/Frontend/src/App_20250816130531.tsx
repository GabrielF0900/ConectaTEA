// src/App.tsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Cadastro from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Profissional/Dashboard/Dashboard';
import Sidebar from "./pages/Profissional/Dashboard/Sidebar.tsx";

function AppContent() {
  const location = useLocation();
  
  // Rotas que não devem mostrar o sidebar
  const publicRoutes = ['/', '/login', '/register'];
  const shouldShowSidebar = !publicRoutes.includes(location.pathname);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar só aparece em rotas protegidas */}
      {shouldShowSidebar && <Sidebar />}
      
      {/* Conteúdo principal */}
      <div className={shouldShowSidebar ? "flex-1" : "w-full"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Cadastro />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<div>Página não encontrada</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
