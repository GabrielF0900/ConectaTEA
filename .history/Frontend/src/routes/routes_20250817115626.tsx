// src/routes.tsx
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login.tsx";
import Register from "../pages/Register.tsx";
import Home from "../pages/Home.tsx";
import Dashboard from "../pages/Profissional/Dashboard/Dashboard.tsx";
import ProtectedRoute from "../components/ProtectedRoute.tsx";
import Criancas from "../pages/Profissional/Criancas/Criancas.tsx";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Rotas do Profissional */}
      <Route
        path="/profissional/dashboard"
        element={
          <ProtectedRoute requiredUserType="PROFISSIONAL">
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profissional/criancas"
        element={
          <ProtectedRoute requiredUserType="PROFISSIONAL">
            <Criancas />
          </ProtectedRoute>
        }
      />

      {/* Rotas do Responsável */}
      <Route
        path="/responsavel/dashboard"
        element={
          <ProtectedRoute requiredUserType="RESPONSAVEL">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Rota de compatibilidade - redireciona baseado no tipo de usuário */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
