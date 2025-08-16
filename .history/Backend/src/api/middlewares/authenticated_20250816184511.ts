// Middleware de autenticação - Verifica se o usuário está logado
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Estendendo a interface Request para incluir dados do usuário
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        email: string;
        tipo: string;
      };
    }
  }
}

export interface AuthenticatedRequest extends Request {
  user: {
    userId: number;
    email: string;
    tipo: string;
  };
}

export function authenticated(req: Request, res: Response, next: NextFunction) {
  try {
    // 1. Verificar se o token foi enviado
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ 
        message: 'Token de acesso não fornecido.',
        error: 'MISSING_TOKEN'
      });
    }

    // 2. Extrair o token do header (formato: "Bearer TOKEN")
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        message: 'Formato do token inválido. Use: Bearer <token>',
        error: 'INVALID_TOKEN_FORMAT'
      });
    }

    // 3. Verificar se o token é válido
    const secret = process.env.JWT_SECRET || 'chave-secreta-padrao';
    
    try {
      const decoded = jwt.verify(token, secret) as any;
      
      // 4. Adicionar os dados do usuário ao request
      req.user = {
        userId: decoded.userId,
        email: decoded.email,
        tipo: decoded.tipo
      };

      // 5. Continuar para o próximo middleware/rota
      next();
      
    } catch (jwtError) {
      if (jwtError instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ 
          message: 'Token expirado. Faça login novamente.',
          error: 'TOKEN_EXPIRED'
        });
      } else if (jwtError instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ 
          message: 'Token inválido.',
          error: 'INVALID_TOKEN'
        });
      } else {
        return res.status(401).json({ 
          message: 'Erro na verificação do token.',
          error: 'TOKEN_VERIFICATION_ERROR'
        });
      }
    }

  } catch (error) {
    console.error('Erro no middleware de autenticação:', error);
    return res.status(500).json({ 
      message: 'Erro interno do servidor.',
      error: 'INTERNAL_SERVER_ERROR'
    });
  }
}