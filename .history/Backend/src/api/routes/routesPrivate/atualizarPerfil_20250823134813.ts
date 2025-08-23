//Algoritmo que cuida de rotas para atualização de perfil.

import { AtualizarPerfil } from "../../atualizarPerfil/atualizarPerfil";
import { Router } from "express";

const router = Router();

router.put("/atualizar-perfil/:id",Auth, AtualizarPerfil);

export default router;
