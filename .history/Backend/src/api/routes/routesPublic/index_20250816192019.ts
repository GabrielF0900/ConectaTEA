// Índice automático para rotas públicas
import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

// Função para importar automaticamente todas as rotas da pasta
async function loadRoutes() {
  const routesPath = __dirname;
  const files = fs.readdirSync(routesPath);

  for (const file of files) {
    // Ignorar o próprio arquivo index.ts e arquivos que não são .ts ou .js
    if (file === 'index.ts' || file === 'index.js' || !file.match(/\.(ts|js)$/)) {
      continue;
    }

    try {
      const routePath = path.join(routesPath, file);
      const routeModule = await import(routePath);
      
      // Se o módulo exporta default, usar como router
      if (routeModule.default) {
        router.use(routeModule.default);
        console.log(`✅ Rota pública carregada: ${file}`);
      }
    } catch (error) {
      console.error(`❌ Erro ao carregar rota pública ${file}:`, error);
    }
  }
}

// Carregar todas as rotas
loadRoutes();

export default router;
