import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

// Páginas públicas
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

// Páginas do Profissional
import Dashboard from '../pages/Profissional/Dashboard/Dashboard';
import CadastrarCriancas from '../pages/Profissional/CadastrarCriancas/CadastrarCriancas';

// Páginas do Responsável
import DashboardResponsavel from '../pages/Responsavel/Dashboard/Dashboard';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rotas do Profissional */}
      <Route 
        path="/profissional/dashboard" 
        element={
          <ProtectedRoute requiredRole="profissional">
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profissional/criancas" 
        element={
          <ProtectedRoute requiredRole="profissional">
            <CadastrarCriancas />
          </ProtectedRoute>
        } 
      />

      {/* Rotas do Responsável */}
      <Route 
        path="/responsavel/dashboard" 
        element={
          <ProtectedRoute requiredRole="responsavel">
            <DashboardResponsavel />
          </ProtectedRoute>
        } 
      />

      {/* Rota de compatibilidade */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}
