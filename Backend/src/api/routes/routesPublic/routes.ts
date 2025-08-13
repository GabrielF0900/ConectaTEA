// routes.ts
import { Router } from 'express';
import { registerUser } from '../../register/register'; 

const router = Router();

// Rota pública para registrar usuários
router.post('/register', registerUser);

// Aqui você pode adicionar outras rotas públicas
// Exemplo:
// router.post('/login', loginUser);

export default router;
