// src/config/routes.ts
export const ROUTES = {
  // Rotas públicas
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  
  // Rotas do Profissional
  PROFISSIONAL: {
    DASHBOARD: '/profissional/dashboard',
    CRIANCAS: '/profissional/criancas',
    METAS: '/profissional/metas',
    SESSOES: '/profissional/sessoes',
    PROGRESSO: '/profissional/progresso',
    CHAT: '/profissional/chat',
    CONFIGURACOES: '/profissional/configuracoes',
  },
  
  // Rotas do Responsável
  RESPONSAVEL: {
    DASHBOARD: '/responsavel/dashboard',
    CRIANCA: '/responsavel/crianca',
    PROGRESSO: '/responsavel/progresso',
    CHAT: '/responsavel/chat',
    AGENDA: '/responsavel/agenda',
    CONFIGURACOES: '/responsavel/configuracoes',
  },
  
  // Rotas de compatibilidade
  LEGACY: {
    DASHBOARD: '/dashboard',
  }
};

// Função helper para redirecionamento baseado no tipo de usuário
export const getDefaultRoute = (userType: string): string => {
  switch (userType) {
    case 'PROFISSIONAL':
      return ROUTES.PROFISSIONAL.DASHBOARD;
    case 'RESPONSAVEL':
      return ROUTES.RESPONSAVEL.DASHBOARD;
    default:
      return ROUTES.LOGIN;
  }
};
