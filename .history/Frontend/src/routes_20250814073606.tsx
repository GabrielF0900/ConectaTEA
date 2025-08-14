// src/routes.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cadastro from '../../.history/Frontend/src/pages/Register_20250814072448';
export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path="/register" element={<div>Register Page</div>} />
        <Route path="/dashboard" element={<div>Dashboard Page</div>} />
        <Route path="*" element={<div>Página não encontrada</div>} />
      </Routes>
    </Router>
  );
}
