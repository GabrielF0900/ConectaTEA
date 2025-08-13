// routes.ts
import { Router } from 'express';
import { registerUser } from '../../register/register'; 
import { loginUser } from '../../login/login';
const router = Router();

// Rota pública para registrar usuários
router.post('/register', registerUser);
router.post('/login',  loginUser);

export default router;
