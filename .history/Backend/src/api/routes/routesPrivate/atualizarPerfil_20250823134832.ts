//Algoritmo que cuida de rotas para atualização de perfil.

import { AtualizarPerfil } from "../../atualizarPerfil/atualizarPerfil";
import { Router } from "express";
import { authenticated } from "../../middlewares/authenticated";

const router = Router();
(req, res, next)
router.put("/atualizar-perfil/:id",authenticated, AtualizarPerfil);

export default router;
