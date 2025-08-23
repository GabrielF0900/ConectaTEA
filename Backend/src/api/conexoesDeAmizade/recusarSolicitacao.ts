//Algoritmo que cuidará de recusar solicitações

import {Request, Response} from "express";
import prisma from "../../lib/prisma";

export async function RecusarSolicitacao(req: Request, res: Response) {
    let { solicitanteId, solicitadoId } = req.body;

    // Normalizar ids (aceitar string ou number)
    solicitanteId = Number(solicitanteId);
    solicitadoId = Number(solicitadoId);

    try {
        // Verifica se a conexão existe
        const conexao = await prisma.conexaoProfissional.findFirst({
            where: {
                solicitante_id: solicitanteId,
                solicitado_id: solicitadoId
            }
        });

        if (!conexao) {
            return res.status(404).json({ error: "Conexão não encontrada." });
        }

        // Atualiza o status da conexão para "RECUSADO"
        const conexaoAtualizada = await prisma.conexaoProfissional.update({
            where: { id: conexao.id },
            data: { status: 'RECUSADO' }
        });

        return res.status(200).json(conexaoAtualizada);
    } catch (error) {
        console.error('Erro ao recusar solicitação:', error);
        return res.status(500).json({ error: 'Erro interno ao recusar solicitação', details: (error as Error).message });
    }
}