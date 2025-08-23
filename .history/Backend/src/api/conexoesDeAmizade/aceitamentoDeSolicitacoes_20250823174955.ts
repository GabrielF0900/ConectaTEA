//Algoritmo que cuidara de aceitar as solicitações recebidas.


import {Request, Response} from "express";
import prisma from "../../lib/prisma";

export async function AceitarSolicitacao(req: Request, res: Response) {
    const { solicitanteId, solicitadoId } = req.body;

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

        // Atualiza o status da conexão para "ACEITA"
        const conexaoAtualizada = await prisma.conexaoProfissional.update({
            where: { id: conexao.id },
            data: { status: "ACEITA" }
        });

        return res.status(200).json(conexaoAtualizada);
    } catch (error) {
        console.error('Erro ao aceitar solicitação:', error);
        return res.status(500).json({ error: 'Erro interno ao aceitar solicitação', details: (error as Error).message });
    }
}