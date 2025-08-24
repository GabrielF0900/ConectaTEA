//Algoritmo que cuidará do envio de solicitações de amizade entre profissionais.

import {Request, Response} from "express";
import prisma from "../../lib/prisma";

export async function EnvioDeSolicitacoes(req: Request, res: Response) {
    //Desestruturando os chunks do corpo da requisição
    // Aceita tanto ids de usuário (solicitanteId/solicitadoId) quanto ids de profissional
    // (solicitanteProfId/solicitadoProfId). Preferência para ids de profissional quando fornecidos.
    let { solicitanteId, solicitadoId, solicitanteProfId, solicitadoProfId } = req.body;

    // Normalizar valores numéricos
    solicitanteId = solicitanteId !== undefined ? Number(solicitanteId) : undefined;
    solicitadoId = solicitadoId !== undefined ? Number(solicitadoId) : undefined;
    solicitanteProfId = solicitanteProfId !== undefined ? Number(solicitanteProfId) : undefined;
    solicitadoProfId = solicitadoProfId !== undefined ? Number(solicitadoProfId) : undefined;

    try {
        // Se não foram fornecidos ids de profissional, então os ids de usuário são obrigatórios
        // e devem ser inteiros. Caso contrário, aceitaremos apenas os ids de profissional.
        if (solicitanteProfId === undefined && solicitadoProfId === undefined) {
            if (!Number.isInteger(solicitanteId) || !Number.isInteger(solicitadoId)) {
                return res.status(400).json({ error: 'IDs de usuários inválidos. Devem ser inteiros.' });
            }
        }

        // Se foram passados ids de profissional, usá-los diretamente
        let solicitanteProf = undefined;
        let solicitadoProf = undefined;

        if (solicitanteProfId) {
            solicitanteProf = await prisma.profissional.findUnique({ where: { id: solicitanteProfId } });
            if (!solicitanteProf) return res.status(404).json({ error: 'Profissional solicitante não encontrado.' });
        }

        if (solicitanteProfId) {
            // Tenta por id de profissional
            solicitanteProf = await prisma.profissional.findUnique({ where: { id: solicitanteProfId } });
            // Se não encontrou, tolerância: talvez o frontend tenha enviado um userId em vez de profissional.id
            if (!solicitanteProf) {
                solicitanteProf = await prisma.profissional.findUnique({ where: { usuario_id: solicitanteProfId } });
            }
            if (!solicitanteProf) return res.status(404).json({ error: 'Profissional solicitante não encontrado (id fornecido não corresponde a profissional nem a usuário).' });
        }

        if (solicitadoProfId) {
            // Tenta por id de profissional
            solicitadoProf = await prisma.profissional.findUnique({ where: { id: solicitadoProfId } });
            // Fallback: talvez seja um userId
            if (!solicitadoProf) {
                solicitadoProf = await prisma.profissional.findUnique({ where: { usuario_id: solicitadoProfId } });
            }
            if (!solicitadoProf) return res.status(404).json({ error: 'Profissional solicitado não encontrado (id fornecido não corresponde a profissional nem a usuário).' });
        }
            const solicitanteUser = await prisma.user.findUnique({ where: { id: solicitanteId } });
            if (!solicitanteUser) return res.status(404).json({ error: 'Usuário solicitante não encontrado.' });
            solicitanteProf = await prisma.profissional.findUnique({ where: { usuario_id: solicitanteId } });
        }

        if (!solicitadoProf) {
            // solicitadoProfId não fornecido -> precisamos dos user ids
            if (!Number.isInteger(solicitadoId)) return res.status(400).json({ error: 'ID do usuário solicitado inválido.' });
            const solicitadoUser = await prisma.user.findUnique({ where: { id: solicitadoId } });
            if (!solicitadoUser) return res.status(404).json({ error: 'Usuário solicitado não encontrado.' });
            solicitadoProf = await prisma.profissional.findUnique({ where: { usuario_id: solicitadoId } });
        }

        if (!solicitanteProf || !solicitadoProf) {
            const missing: string[] = [];
            if (!solicitanteProf) missing.push('solicitante');
            if (!solicitadoProf) missing.push('solicitado');
            return res.status(404).json({ error: 'Profissional associado ao usuário não encontrado.', missing });
        }

    // Criando a solicitação de amizade (ConexaoProfissional)
    // Observação: permitimos múltiplas solicitações entre os mesmos profissionais
    const novaSolicitacao = await prisma.conexaoProfissional.create({ data: { solicitante_id: solicitanteProf.id, solicitado_id: solicitadoProf.id } });

    return res.status(201).json(novaSolicitacao);
    } catch (error) {
    console.error('Erro ao enviar solicitação:', error);
    // Retornar mensagem de erro detalhada em desenvolvimento
    return res.status(500).json({ error: 'Erro interno ao enviar solicitação', details: (error as Error).message });
    }
}