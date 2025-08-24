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
    const currentUserId = (req as any).user?.userId as number | undefined;

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

        // Primeiro, tentar recusar uma solicitação PENDENTE (destinado ao usuário autenticado)
        const conexaoPendente = await prisma.conexaoProfissional.findFirst({
            where: {
                solicitante_id: solicitanteProf.id,
                solicitado_id: solicitadoProf.id,
                status: 'PENDENTE'
            },
            orderBy: { criado_em: 'desc' }
        });

        if (conexaoPendente) {
            // Permitir que tanto o remetente quanto o destinatário cancelem/recusem a solicitação pendente
            if (currentUserId && currentUserId !== solicitadoProf.usuario_id && currentUserId !== solicitanteProf.usuario_id) {
                return res.status(403).json({ error: 'Você não tem permissão para cancelar/recusar esta solicitação.' });
            }

            const conexaoAtualizada = await prisma.conexaoProfissional.update({
                where: { id: conexaoPendente.id },
                data: { status: 'RECUSADO' }
            });

            return res.status(200).json(conexaoAtualizada);
        }

        // Se não há pendente, tentar localizar uma conexão ACEITA e desfazê-la (remoção)
        const conexaoAceita = await prisma.conexaoProfissional.findFirst({
            where: {
                OR: [
                    { AND: [{ solicitante_id: solicitanteProf.id }, { solicitado_id: solicitadoProf.id }] },
                    { AND: [{ solicitante_id: solicitadoProf.id }, { solicitado_id: solicitanteProf.id }] }
                ],
                status: 'ACEITO'
            },
            orderBy: { criado_em: 'desc' }
        });

        if (!conexaoAceita) return res.status(404).json({ error: 'Nenhuma solicitação pendente ou conexão aceita encontrada entre os usuários.' });

        // Verificar autorização: apenas um dos envolvidos pode desfazer
        if (currentUserId && currentUserId !== solicitanteProf.usuario_id && currentUserId !== solicitadoProf.usuario_id) {
            return res.status(403).json({ error: 'Você não tem permissão para desfazer esta conexão.' });
        }

        // Atualizar status para RECUSADO (mantendo histórico) ao invés de deletar
        const conexaoRemovida = await prisma.conexaoProfissional.update({
            where: { id: conexaoAceita.id },
            data: { status: 'RECUSADO' }
        });

        return res.status(200).json(conexaoRemovida);
    } catch (error) {
        console.error('Erro ao recusar solicitação:', error);
        return res.status(500).json({ error: 'Erro interno ao recusar solicitação', details: (error as Error).message });
    }
}