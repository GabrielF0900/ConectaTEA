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

    const solicitante = await prisma.user.findUnique({ where: { id: solicitanteId } });
    const solicitado = await prisma.user.findUnique({ where: { id: solicitadoId } });

        if (!solicitante || !solicitado) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        //Verificando se ja existe uma solicitação de amizade enviada do solicitante para solicitado
        if (await prisma.solicitacao.findUnique({ where: { solicitanteId, solicitadoId } })) {
            return res.status(409).json({ error: "Solicitação de amizade já enviada." });
        }

        // Criando a solicitação de amizade
        const novaSolicitacao = await prisma.solicitacao.create({
            data: {
                solicitanteId,
                solicitadoId
            }
        });

        return res.status(201).json(novaSolicitacao);
    } catch (error) {
        console.error('Erro ao enviar solicitação:', error);
        return res.status(500).json({ error: 'Erro interno ao enviar solicitação' });
    }
}