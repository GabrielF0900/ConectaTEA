// Middleware de autorização - Verifica se o usuário tem permissão para acessar a rota
import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './authenticated';

export type UserType = 'PROFISSIONAL' | 'RESPONSAVEL';

// Middleware para verificar se o usuário tem o papel necessário
export function authorized(allowedRoles: UserType[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Verificar se o usuário está autenticado (deve usar authenticated middleware antes)
      if (!req.user) {
        return res.status(401).json({ 
          message: 'Usuário não autenticado. Use o middleware authenticated primeiro.',
          error: 'NOT_AUTHENTICATED'
        });
      }

      const userType = req.user.tipo as UserType;

      // Verificar se o tipo do usuário está entre os permitidos
      if (!allowedRoles.includes(userType)) {
        return res.status(403).json({ 
          message: `Acesso negado. Esta rota é restrita a: ${allowedRoles.join(', ')}`,
          error: 'INSUFFICIENT_PERMISSIONS',
          userType: userType,
          allowedRoles: allowedRoles
        });
      }

      // Usuário autorizado, continuar
      next();

    } catch (error) {
      console.error('Erro no middleware de autorização:', error);
      return res.status(500).json({ 
        message: 'Erro interno do servidor.',
        error: 'INTERNAL_SERVER_ERROR'
      });
    }
  };
}

// Middlewares específicos para facilitar o uso
export const profissionalOnly = authorized(['PROFISSIONAL']);
export const responsavelOnly = authorized(['RESPONSAVEL']);
export const anyAuthenticated = authorized(['PROFISSIONAL', 'RESPONSAVEL']);

// Middleware para verificar se o usuário pode acessar dados de uma criança específica
export function canAccessChild(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        message: 'Usuário não autenticado.',
        error: 'NOT_AUTHENTICATED'
      });
    }

    const userType = req.user.tipo as UserType;
    const childId = parseInt(req.params.childId || req.body.childId);

    if (!childId) {
      return res.status(400).json({ 
        message: 'ID da criança não fornecido.',
        error: 'MISSING_CHILD_ID'
      });
    }

    // Profissionais podem acessar qualquer criança (assumindo que têm permissão geral)
    if (userType === 'PROFISSIONAL') {
      next();
      return;
    }

    // Responsáveis só podem acessar suas próprias crianças
    if (userType === 'RESPONSAVEL') {
      // Aqui você pode adicionar lógica para verificar se a criança pertence ao responsável
      // Por enquanto, vamos permitir (você pode implementar a verificação no banco depois)
      next();
      return;
    }

    return res.status(403).json({ 
      message: 'Acesso negado a esta criança.',
      error: 'CHILD_ACCESS_DENIED'
    });

  } catch (error) {
    console.error('Erro no middleware de acesso à criança:', error);
    return res.status(500).json({ 
      message: 'Erro interno do servidor.',
      error: 'INTERNAL_SERVER_ERROR'
    });
  }
}

// Middleware para verificar se o usuário pode acessar dados de outro profissional
export function canAccessProfessional(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        message: 'Usuário não autenticado.',
        error: 'NOT_AUTHENTICATED'
      });
    }

    const userType = req.user.tipo as UserType;
    const targetProfessionalId = parseInt(req.params.professionalId);

    // Apenas profissionais podem acessar dados de outros profissionais
    if (userType !== 'PROFISSIONAL') {
      return res.status(403).json({ 
        message: 'Apenas profissionais podem acessar dados de outros profissionais.',
        error: 'PROFESSIONAL_ACCESS_ONLY'
      });
    }

    // Verificar se está tentando acessar seus próprios dados ou tem permissão para outros
    if (targetProfessionalId && targetProfessionalId !== req.user.userId) {
      // Aqui você pode adicionar lógica para verificar hierarquia/permissões especiais
      // Por enquanto, vamos permitir qualquer profissional acessar outros
    }

    next();

  } catch (error) {
    console.error('Erro no middleware de acesso ao profissional:', error);
    return res.status(500).json({ 
      message: 'Erro interno do servidor.',
      error: 'INTERNAL_SERVER_ERROR'
    });
  }
}
