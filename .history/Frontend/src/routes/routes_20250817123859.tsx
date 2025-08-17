// src/routes.tsx
import { Routes, Route } from 'react-router-dom';
import Cadastro from '../pages/Register';
import Login from '../pages/Login';
import ConectaTEALanding from '../pages/Home';
import ProfissionalDashboard from '../pages/Profissional/Dashboard/Dashboard';
import ProtectedRoute from '../components/ProtectedRoute';
// import CadastrarCriancas from "../pages/Profissional/CadastrarCriancas/CadastrarCriancas";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ConectaTEALanding />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Cadastro />} />
      
      {/* Rotas do Profissional - Protegidas */}
      <Route 
        path="/profissional/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['PROFISSIONAL']}>
            <ProfissionalDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Nova rota para Cadastro de Crianças */}
      <Route 
        path="/profissional/criancas" 
        element={
          <ProtectedRoute allowedRoles={['PROFISSIONAL']}>
            <CadastrarCriancas />
          </ProtectedRoute>
        } 
      />
      
      {/* Rotas do Responsável - Protegidas */}
      <Route 
        path="/responsavel/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['RESPONSAVEL']}>
            <div className="p-6 text-center">
              <h1 className="text-2xl font-bold">Dashboard do Responsável</h1>
              <p className="text-gray-600 mt-2">Em desenvolvimento...</p>
            </div>
          </ProtectedRoute>
        } 
      />
      
      {/* Compatibilidade com rota antiga */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['PROFISSIONAL', 'RESPONSAVEL']}>
            <ProfissionalDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route path="*" element={<div className="p-8 text-center text-red-500">Página não encontrada</div>} />
    </Routes>
  );
}
