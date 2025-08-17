import { Router } from "express";
import { CadastrarCrianca } from "../../cadastrarCrianca/cadastrarCrianca";
import { ListarCriancas, CadastrarCriancaSimples } from "../../cadastrarCrianca/listarCriancas";
import { authenticated } from "../../middlewares/authenticated";
import { profissionalOnly } from "../../middlewares/authorized";

const router = Router();

// Rotas protegidas: apenas profissionais podem gerenciar crianças
router.get("/profissional/criancas", authenticated, profissionalOnly, ListarCriancas);
router.post("/profissional/criancas", authenticated, profissionalOnly, CadastrarCriancaSimples);

// Rota protegida: cadastro completo de criança (mantida para compatibilidade)
router.post("/cadastrar-crianca", authenticated, profissionalOnly, CadastrarCrianca);

export default router;
