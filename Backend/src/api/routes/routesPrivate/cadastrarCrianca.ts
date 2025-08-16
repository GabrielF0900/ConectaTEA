import { Router } from "express";
import { CadastrarCrianca } from "../../cadastrarCrianca/cadastrarCrianca";
import { authenticated } from "../../middlewares/authenticated";
import { profissionalOnly } from "../../middlewares/authorized";

const router = Router();

// Rota protegida: apenas profissionais podem cadastrar criança
router.post("/cadastrar-crianca", authenticated, profissionalOnly, CadastrarCrianca);

export default router;
