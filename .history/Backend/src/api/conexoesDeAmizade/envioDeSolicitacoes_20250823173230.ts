//Algoritmo que cuidará do envio de solicitações de amizade entre profissionais.

import {Request, Response} from "express";
import prisma from "../../lib/prisma";

export async function EnvioDeSolicitacoes(req: Request, res: Response) {
    //Desestruturando os chunks do corpo da requisição
    let { solicitanteId, solicitadoId } = req.body;

    // Normalizar ids (aceitar string ou number)
    solicitanteId = Number(solicitanteId);
    solicitadoId = Number(solicitadoId);

    try {
        //Verificando se os usuários existem no banco de dados e se um deles nao existir, retorna erro.
        if (!Number.isInteger(solicitanteId) || !Number.isInteger(solicitadoId)) {
            return res.status(400).json({ error: 'IDs de usuários inválidos. Devem ser inteiros.' });
        }

        const solicitante = await prisma.user.findUnique({ where: { id: solicitanteId } });
        const solicitado = await prisma.user.findUnique({ where: { id: solicitadoId } });

        if (!solicitante || !solicitado) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        // Verificando se já existe uma solicitação de amizade enviada do solicitante para solicitado
    const existente = await prisma.conexaoProfissional.findFirst({ where: { solicitante_id: solicitanteId, solicitado_id: solicitadoId } });

        if (existente) {
            return res.status(409).json({ error: "Solicitação de amizade já enviada." });
        }

        // Criando a solicitação de amizade (ConexaoProfissional)
    const novaSolicitacao = await prisma.conexaoProfissional.create({ data: { solicitante_id: solicitanteId, solicitado_id: solicitadoId } });

    return res.status(201).json(novaSolicitacao);
    } catch (error) {
    console.error('Erro ao enviar solicitação:', error);
    // Retornar mensagem de erro detalhada em desenvolvimento
    return res.status(500).json({ error: 'Erro interno ao enviar solicitação', details: (error as Error).message });
    }
}