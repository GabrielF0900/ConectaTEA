//Algoritmo que cuidará do envio de solicitações de amizade entre profissionais


import { EnvioDeSolicitacoes } from "../../conexoesDeAmizade/envioDeSolicitacoes";
import { Router } from "express";
import { RecusarSolicitacao } from "../../conexoesDeAmizade/recusarSolicitacao";
import { authenticated } from "../../middlewares/authenticated";

const router = Router();

router.post("/solicitacoes", authenticated, EnvioDeSolicitacoes);

export default router;