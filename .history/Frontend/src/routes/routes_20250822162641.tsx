import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

// Páginas públicas
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

// Páginas do Profissional
import Dashboard from '../pages/Profissional/Dashboard/Dashboard';
import CadastrarCriancas from '../pages/Profissional/CadastrarCriancas/CadastrarCriancas';
import VerDetalhesCriancaCadastrada from '../pages/Profissional/CadastrarCriancas/VerDetalhesCriancaCadastrada';
import EditarCriancaCadastrada from '../pages/Profissional/CadastrarCriancas/EditarCriancaCadastrada';
import Profissionais from '../pages/Profissional/Profissionais/Profissionais';
import ModalPerfilProfissional from '../pages/Profissional/Profissionais/ModalPerfilProfissional';



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
          <ProtectedRoute allowedRoles={['PROFISSIONAL']}>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profissional/criancas" 
        element={
          <ProtectedRoute allowedRoles={['PROFISSIONAL']}>
            <CadastrarCriancas />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profissional/criancas/detalhes/:id" 
        element={
          <ProtectedRoute allowedRoles={['PROFISSIONAL']}>
            <VerDetalhesCriancaCadastrada />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profissional/criancas/editar/:id" 
        element={
          <ProtectedRoute allowedRoles={['PROFISSIONAL']}>
            <EditarCriancaCadastrada />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/profissional/profissionais" 
        element={
          <ProtectedRoute allowedRoles={['PROFISSIONAL']}>
            <Profissionais />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/profissional/profissionais/perfil/:id" 
        element={
          <ProtectedRoute allowedRoles={['PROFISSIONAL']}>
            <ModalPerfilProfissional open={true} onClose={() => {}} profissional={{ profissionaal}} />
          </ProtectedRoute>
        }

      {/* Rotas do Responsável */}
      <Route 
        path="/responsavel/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['RESPONSAVEL']}>
            <Dashboard />
          </ProtectedRoute>
        } 
      />


      {/* Rota de compatibilidade */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['PROFISSIONAL', 'RESPONSAVEL']}>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}
