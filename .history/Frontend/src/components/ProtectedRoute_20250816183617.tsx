// src/components/ProtectedRoute.tsx
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[]; // Ex: ['PROFISSIONAL'] ou ['RESPONSAVEL']
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      // Usuário não logado
      navigate("/login");
      return;
    }

    try {
      const user = JSON.parse(userData);
      
      if (allowedRoles.includes(user.tipo)) {
        setIsAuthorized(true);
      } else {
        // Usuário logado mas sem permissão para esta rota
        // Redireciona para o dashboard correto do seu tipo
        if (user.tipo === "PROFISSIONAL") {
          navigate("/profissional/dashboard");
        } else if (user.tipo === "RESPONSAVEL") {
          navigate("/responsavel/dashboard");
        } else {
          navigate("/login");
        }
      }
    } catch (error) {
      console.error("Erro ao verificar autorização:", error);
      navigate("/login");
    }
  }, [navigate, allowedRoles]);

  if (isAuthorized === null) {
    // Loading state
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Verificando permissões...</p>
        </div>
      </div>
    );
  }

  return isAuthorized ? <>{children}</> : null;
}
