//Algoritmo que cuidará do envio de solicitações de amizade entre profissionais


import { EnvioDeSolicitacoes } from "../../conexoesDeAmizade/envioDeSolicitacoes";
import { Router } from "express";

const router = Router();

router.post("/solicitacoes", EnvioDeSolicitacoes);

export default router;