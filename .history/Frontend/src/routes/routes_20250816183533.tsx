// src/routes.tsx
import { Routes, Route } from 'react-router-dom';
import Cadastro from '../pages/Register';
import Login from '../pages/Login';
import Home from '../pages/Home';
import ProfissionalDashboard from '../pages/Profissional/Dashboard/Dashboard';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Cadastro />} />
      
      {/* Rotas do Profissional */}
      <Route path="/profissional/dashboard" element={<ProfissionalDashboard />} />
      
      {/* Rotas do Responsável (preparadas para futuro desenvolvimento) */}
      <Route path="/responsavel/dashboard" element={<div className="p-6 text-center"><h1 className="text-2xl font-bold">Dashboard do Responsável</h1><p className="text-gray-600 mt-2">Em desenvolvimento...</p></div>} />
      
      {/* Redirecionamento da rota antiga para compatibilidade */}
      <Route path="/dashboard" element={<ProfissionalDashboard />} />
      
      <Route path="*" element={<div>Página não encontrada</div>} />
    </Routes>
  );
}
