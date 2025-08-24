//Algoritmo que cuidará de recusar solicitações

import {Request, Response} from "express";
import prisma from "../../lib/prisma";

export async function RecusarSolicitacao(req: Request, res: Response) {
    let { solicitanteId, solicitadoId, solicitanteProfId, solicitadoProfId } = req.body;

    // Normalizar valores
    solicitanteId = solicitanteId !== undefined ? Number(solicitanteId) : undefined;
    solicitadoId = solicitadoId !== undefined ? Number(solicitadoId) : undefined;
    solicitanteProfId = solicitanteProfId !== undefined ? Number(solicitanteProfId) : undefined;
    solicitadoProfId = solicitadoProfId !== undefined ? Number(solicitadoProfId) : undefined;

    try {
        let solicitanteProf = undefined;
        let solicitadoProf = undefined;

        if (solicitanteProfId) {
            solicitanteProf = await prisma.profissional.findUnique({ where: { id: solicitanteProfId } });
            if (!solicitanteProf) return res.status(404).json({ error: 'Profissional solicitante não encontrado.' });
        }

        if (solicitadoProfId) {
            solicitadoProf = await prisma.profissional.findUnique({ where: { id: solicitadoProfId } });
            if (!solicitadoProf) return res.status(404).json({ error: 'Profissional solicitado não encontrado.' });
        }

        if (!solicitanteProf) {
            if (!Number.isInteger(solicitanteId)) return res.status(400).json({ error: 'ID do usuário solicitante inválido.' });
            const solicitanteUser = await prisma.user.findUnique({ where: { id: solicitanteId } });
            if (!solicitanteUser) return res.status(404).json({ error: 'Usuário solicitante não encontrado.' });
            solicitanteProf = await prisma.profissional.findUnique({ where: { usuario_id: solicitanteId } });
        }

        if (!solicitadoProf) {
            if (!Number.isInteger(solicitadoId)) return res.status(400).json({ error: 'ID do usuário solicitado inválido.' });
            const solicitadoUser = await prisma.user.findUnique({ where: { id: solicitadoId } });
            if (!solicitadoUser) return res.status(404).json({ error: 'Usuário solicitado não encontrado.' });
            solicitadoProf = await prisma.profissional.findUnique({ where: { usuario_id: solicitadoId } });
        }

        if (!solicitanteProf || !solicitadoProf) return res.status(404).json({ error: 'Profissional não encontrado para um dos lados.' });

        const conexao = await prisma.conexaoProfissional.findFirst({
            where: {
                solicitante_id: solicitanteProf.id,
                solicitado_id: solicitadoProf.id,
                status: 'PENDENTE'
            },
            orderBy: { criado_em: 'desc' }
        });

        if (!conexao) return res.status(404).json({ error: 'Solicitação pendente não encontrada.' });

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