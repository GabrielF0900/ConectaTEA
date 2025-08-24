//Algoritmo que cuidará do envio de solicitações de amizade entre profissionais


import { EnvioDeSolicitacoes } from "../../conexoesDeAmizade/envioDeSolicitacoes";
import { Router } from "express";
import { RecusarSolicitacao } from "../../conexoesDeAmizade/recusarSolicitacao";
import { AceitarSolicitacao } from "../../conexoesDeAmizade/aceitamentoDeSolicitacoes";
import { ListarSolicitacoesEnviadas } from "../../conexoesDeAmizade/listarSolicitacoesEnviadas";
import { ListarSolicitacoesRecebidas } from "../../conexoesDeAmizade/listarSolicitacoesRecebidas";
import { authenticated } from "../../middlewares/authenticated";

const router = Router();

router.post("/solicitacoes", authenticated, EnvioDeSolicitacoes);
router.delete("/solicitacoes", authenticated, RecusarSolicitacao);
router.put("/solicitacoes", authenticated, AceitarSolicitacao);
router.get("/solicitacoes/enviadas", authenticated, ListarSolicitacoesEnviadas);
router.get("/solicitacoes/recebidas", authenticated, ListarSolicitacoesRecebidas);

export default router;