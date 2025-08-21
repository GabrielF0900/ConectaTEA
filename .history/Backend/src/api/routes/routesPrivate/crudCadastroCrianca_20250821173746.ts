//Algoritmo que cuidará das rotas dos cruds sobre cadastro de criança.

import { ReadCrianca } from "../../crudCriancaCadastrada/read";
import { DeleteCrianca } from "../../crudCriancaCadastrada/delete";
import { Router } from "express";
import { authenticated } from "../../middlewares/authenticated";
import { authorized } from "../../middlewares/authorized";
import {}

const router = Router();

// Aplicar middlewares de autenticação e autorização em todas as rotas
// Apenas profissionais podem acessar as rotas de CRUD de crianças
router.get("/read/:id", authenticated, authorized(['PROFISSIONAL']), ReadCrianca);
router.delete("/delete/:id", authenticated, authorized(['PROFISSIONAL']), DeleteCrianca);

export default router;