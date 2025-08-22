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
            <ModalPerfilProfissional 
              open={true} 
              onClose={() => {}} 
              profissional={{
                nome: "Dr. João Santos",
                especialidade: "Psicólogo",
                status: "Ativo",
                codigo: "PROF-001",
                criancasAtendidas: 8,
                dataIngresso: "14/03/2023",
                sobre: "Psicólogo especializado em Análise do Comportamento Aplicada (ABA) com mais de 10 anos de experiência no atendimento de crianças com Transtorno do Espectro Autista. Formado pela Universidade de São Paulo e com especialização em Terapia Comportamental.",
                formacao: [
                  { titulo: "Graduação em Psicologia", instituicao: "Universidade de São Paulo (USP)", ano: "2010" },
                  { titulo: "Especialização em ABA", instituicao: "Instituto de Análise do Comportamento", ano: "2012" },
                ],
                experiencias: [
                  { cargo: "Psicólogo Clínico", local: "Clínica Conecta TEA", periodo: "2020 - Atual", descricao: "Atendimento especializado em crianças com TEA utilizando metodologia ABA" },
                  { cargo: "Coordenador de Terapias", local: "Centro Terapêutico Infantil", periodo: "2015 - 2020", descricao: "Coordenação de equipe multidisciplinar e desenvolvimento de protocolos terapêuticos" },
                ],
                locais: [
                  { nome: "Clínica Conecta TEA", endereco: "Rua das Flores, 123", cidade: "São Paulo - SP" },
                  { nome: "Centro de Desenvolvimento Infantil", endereco: "Av. Paulista, 456", cidade: "São Paulo - SP" },
                ],
                areas: ["ABA", "Denver", "TEACCH", "Terapia Comportamental"],
                redes: { linkedin: "#", instagram: "#" },
              }}
            />
          </ProtectedRoute>
        }
        />

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
