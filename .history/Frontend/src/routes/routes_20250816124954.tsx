// src/routes.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cadastro from '../pages/Register';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Dashboard from '../pages/Profissional/Dashboard/Dashboard';
export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Cadastro />} />
        <Route path="/dashboard" element={<} />
        <Route path="*" element={<div>Página não encontrada</div>} />
      </Routes>
    </Router>
  );
}
