import { Router } from 'express';
import { authenticated } from '../../middlewares/authenticated';
import { listarProfissionaisHandler } from '../../profissionais/listarProfissionais';

const router = Router();

// GET /profissionais?search=...&usuarioId=...
router.get('/profissionais', authenticated, listarProfissionaisHandler);

export default router;
