// Sistema principal de rotas - importa automaticamente rotas públicas e privadas
import { Router } from 'express';
import publicRoutes from './routesPublic';
import privateRoutes from './routesPrivate';

const router = Router();

// Configurar rotas públicas (sem prefixo adicional)
router.use(publicRoutes);

// Configurar rotas privadas (com prefixo /private)
router.use('/private', privateRoutes);

console.log('🚀 Sistema de rotas configurado com sucesso!');

export default router;
