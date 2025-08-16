// Middleware avançado que combina autenticação, autorização e validação
import { Request, Response, NextFunction } from 'express';
import { authenticated } from './authenticated';
import { authorized, UserType } from './authorized';
import { 
  validateResponsavelChildAccess, 
  validateProfissionalChildAccess,
  validateId,
  isProfissional,
  isResponsavel
} from './validators';

// Middleware que verifica acesso a criança com validação no banco
export function secureChildAccess(req: Request, res: Response, next: NextFunction) {
  return async () => {
    try {
      // Verificar se usuário está autenticado
      if (!req.user) {
        return res.status(401).json({ 
          message: 'Usuário não autenticado.',
          error: 'NOT_AUTHENTICATED'
        });
      }

      // Extrair e validar ID da criança
      const childIdParam = req.params.childId || req.body.childId || req.query.childId;
      const { isValid, id: childId } = validateId(childIdParam);

      if (!isValid || !childId) {
        return res.status(400).json({ 
          message: 'ID da criança inválido.',
          error: 'INVALID_CHILD_ID'
        });
      }

      const userId = req.user.userId;
      const userType = req.user.tipo as UserType;

      // Validação específica por tipo de usuário
      if (userType === 'RESPONSAVEL') {
        const validation = await validateResponsavelChildAccess(userId, childId);
        if (!validation.isValid) {
          return res.status(403).json({ 
            message: validation.message,
            error: validation.error
          });
        }
      } else if (userType === 'PROFISSIONAL') {
        const validation = await validateProfissionalChildAccess(userId, childId);
        if (!validation.isValid) {
          return res.status(403).json({ 
            message: validation.message,
            error: validation.error
          });
        }
      } else {
        return res.status(403).json({ 
          message: 'Tipo de usuário não reconhecido.',
          error: 'UNKNOWN_USER_TYPE'
        });
      }

      // Adicionar childId validado ao request para uso posterior
      req.params.validatedChildId = childId.toString();
      
      next();

    } catch (error) {
      console.error('Erro no middleware de acesso seguro à criança:', error);
      return res.status(500).json({ 
        message: 'Erro interno do servidor.',
        error: 'INTERNAL_SERVER_ERROR'
      });
    }
  };
}

// Combo middleware: authenticated + authorized + childAccess
export function protectedChildRoute(allowedRoles: UserType[]) {
  return [
    authenticated,
    authorized(allowedRoles),
    secureChildAccess
  ];
}

// Middleware para rotas que só profissionais acessam
export const professionalRoute = [
  authenticated,
  authorized(['PROFISSIONAL'])
];

// Middleware para rotas que só responsáveis acessam  
export const responsibleRoute = [
  authenticated,
  authorized(['RESPONSAVEL'])
];

// Middleware para rotas abertas a qualquer usuário autenticado
export const authenticatedRoute = [
  authenticated,
  authorized(['PROFISSIONAL', 'RESPONSAVEL'])
];

// Middleware para logging e monitoramento
export function auditLog(action: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const timestamp = new Date().toISOString();
    
    console.log(`[AUDIT] ${timestamp} - User ${user?.userId} (${user?.tipo}) - Action: ${action} - Route: ${req.method} ${req.path}`);
    
    // Aqui você pode salvar no banco de dados para auditoria
    // await saveAuditLog({ userId: user.userId, action, route: req.path, timestamp });
    
    next();
  };
}

// Middleware para rate limiting simples (pode ser melhorado com Redis)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(maxRequests: number, windowMs: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.userId;
    if (!userId) {
      return next(); // Se não autenticado, deixa outros middlewares lidarem
    }

    const key = `${userId}:${req.path}`;
    const now = Date.now();
    const userLimit = requestCounts.get(key);

    if (!userLimit || now > userLimit.resetTime) {
      // Primeiro request ou janela expirou
      requestCounts.set(key, { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (userLimit.count >= maxRequests) {
      return res.status(429).json({
        message: 'Muitas requisições. Tente novamente mais tarde.',
        error: 'RATE_LIMIT_EXCEEDED',
        retryAfter: Math.ceil((userLimit.resetTime - now) / 1000)
      });
    }

    userLimit.count++;
    next();
  };
}

// Exemplos de uso dos middlewares compostos
export const exampleUsage = {
  // Rota protegida para profissionais verem qualquer criança
  professionalChildRoute: [
    ...professionalRoute,
    auditLog('VIEW_CHILD'),
    rateLimit(100, 60000) // 100 requests per minute
  ],
  
  // Rota protegida para responsáveis verem apenas sua criança
  responsibleChildRoute: [
    ...responsibleRoute,
    secureChildAccess,
    auditLog('VIEW_OWN_CHILD'),
    rateLimit(50, 60000) // 50 requests per minute
  ],
  
  // Rota aberta para qualquer usuário autenticado
  generalRoute: [
    ...authenticatedRoute,
    auditLog('GENERAL_ACCESS'),
    rateLimit(200, 60000) // 200 requests per minute
  ]
};
