import { Router } from "express";
import { CadastrarCrianca } from "../../cadastrarCrianca/cadastrarCrianca";
import { ListarCriancas, CadastrarCriancaSimples } from "../../cadastrarCrianca/listarCriancas";
import { authenticated } from "../../middlewares/authenticated";
import { profissionalOnly } from "../../middlewares/authorized";

const router = Router();

// Rotas protegidas: apenas profissionais podem gerenciar crianças
router.get("/criancas", authenticated, profissionalOnly, ListarCriancas);
router.post("/criancas", authenticated, profissionalOnly, CadastrarCriancaSimples);

// Rota protegida: cadastro completo de criança (mantida para compatibilidade)
router.post("/cadastrar-crianca", authenticated, profissionalOnly, CadastrarCrianca);

export default router;
