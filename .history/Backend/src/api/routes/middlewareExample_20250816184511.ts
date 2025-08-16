// Exemplo de como usar os middlewares nas rotas
import express from 'express';
import { authenticated } from '../middlewares/authenticated';
import { 
  authorized, 
  profissionalOnly, 
  responsavelOnly, 
  anyAuthenticated,
  canAccessChild,
  canAccessProfessional 
} from '../middlewares/authorized';

const router = express.Router();

// ========================================
// ROTAS PÚBLICAS (sem middleware)
// ========================================
router.post('/login', (req, res) => {
  // Lógica de login
  res.json({ message: 'Login endpoint' });
});

router.post('/register', (req, res) => {
  // Lógica de registro
  res.json({ message: 'Register endpoint' });
});

// ========================================
// ROTAS PROTEGIDAS - QUALQUER USUÁRIO AUTENTICADO
// ========================================
router.get('/profile', authenticated, anyAuthenticated, (req, res) => {
  // Tanto profissional quanto responsável podem acessar
  res.json({ 
    message: 'Perfil do usuário',
    user: req.user 
  });
});

router.put('/profile', authenticated, anyAuthenticated, (req, res) => {
  // Atualizar perfil próprio
  res.json({ message: 'Perfil atualizado' });
});

// ========================================
// ROTAS EXCLUSIVAS PARA PROFISSIONAIS
// ========================================
router.get('/profissional/dashboard', authenticated, profissionalOnly, (req, res) => {
  // Apenas profissionais podem acessar
  res.json({ 
    message: 'Dashboard do profissional',
    stats: {
      totalCriancas: 25,
      metasAtivas: 47,
      sessoesMes: 120
    }
  });
});

router.get('/profissional/criancas', authenticated, profissionalOnly, (req, res) => {
  // Lista todas as crianças (visão do profissional)
  res.json({ message: 'Lista de crianças para profissional' });
});

router.post('/profissional/criancas', authenticated, profissionalOnly, (req, res) => {
  // Criar nova criança
  res.json({ message: 'Criança criada' });
});

router.get('/profissional/criancas/:childId', authenticated, profissionalOnly, canAccessChild, (req, res) => {
  // Detalhes de uma criança específica
  res.json({ 
    message: 'Detalhes da criança',
    childId: req.params.childId 
  });
});

router.put('/profissional/criancas/:childId/metas', authenticated, profissionalOnly, canAccessChild, (req, res) => {
  // Atualizar metas de uma criança
  res.json({ message: 'Metas atualizadas' });
});

router.get('/profissional/outros/:professionalId', authenticated, profissionalOnly, canAccessProfessional, (req, res) => {
  // Acessar dados de outro profissional
  res.json({ message: 'Dados do profissional' });
});

// ========================================
// ROTAS EXCLUSIVAS PARA RESPONSÁVEIS
// ========================================
router.get('/responsavel/dashboard', authenticated, responsavelOnly, (req, res) => {
  // Dashboard específico para responsáveis
  res.json({ 
    message: 'Dashboard do responsável',
    crianca: {
      nome: 'Ana Silva',
      progresso: 85,
      proximaSessao: '2025-08-17T10:00:00Z'
    }
  });
});

router.get('/responsavel/crianca', authenticated, responsavelOnly, (req, res) => {
  // Dados da criança do responsável
  res.json({ message: 'Dados da minha criança' });
});

router.get('/responsavel/crianca/progresso', authenticated, responsavelOnly, (req, res) => {
  // Progresso da criança
  res.json({ message: 'Progresso da criança' });
});

router.post('/responsavel/crianca/sessao', authenticated, responsavelOnly, (req, res) => {
  // Agendar sessão
  res.json({ message: 'Sessão agendada' });
});

// ========================================
// ROTAS COM AUTORIZAÇÃO MÚLTIPLA
// ========================================
router.get('/criancas/:childId/sessoes', 
  authenticated, 
  authorized(['PROFISSIONAL', 'RESPONSAVEL']), 
  canAccessChild, 
  (req, res) => {
    // Tanto profissional quanto responsável podem ver sessões
    // mas canAccessChild garante que responsável só vê da sua criança
    res.json({ message: 'Sessões da criança' });
  }
);

router.get('/chat/:childId', 
  authenticated, 
  anyAuthenticated, 
  canAccessChild, 
  (req, res) => {
    // Chat entre profissional e responsável sobre uma criança
    res.json({ message: 'Mensagens do chat' });
  }
);

// ========================================
// ROTA DE TESTE PARA DEBUG
// ========================================
router.get('/test/auth', authenticated, (req, res) => {
  res.json({ 
    message: 'Teste de autenticação',
    user: req.user,
    timestamp: new Date().toISOString()
  });
});

export default router;
