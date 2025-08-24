import { Router } from 'express';
import { authenticated } from '../../middlewares/authenticated';
import { listarProfissionaisHandler } from '../../profissionais/listarProfissionais';

const router = Router();

// GET /profissionais?search=...&usuarioId=... (rota pública para leitura)
router.get('/profissionais', listarProfissionaisHandler);

export default router;
