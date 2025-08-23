//Algoritmo que cuidará do envio de solicitações de amizade entre profissionais.

import {Request, Response} from "express";
import prisma from "../../lib/prisma";

export async function EnvioDeSolicitacoes(req: Request, res: Response) {
    //Desestruturando os chunks do corpo da requisição
    const {solicitanteId, solicitadoId} = req.body;

    try {
        //Verificando se os usuários existem no banco de dados e se um deles nao existir, retorna erro.
        if(!solicitanteId || !solicitadoId) {
            return res.status(400).json({ error: "IDs de usuários inválidos." });
        }

        const solicitante = await prisma.conexao.findUnique({ where: { id: solicitanteId } });
        const solicitado = await prisma.conexao.findUnique({ where: { id: solicitadoId } });

        if (!solicitante || !solicitado) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }
    } catch (error) {
        
    }
}