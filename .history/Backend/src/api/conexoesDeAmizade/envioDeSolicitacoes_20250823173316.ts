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

        // Verifica se existem os usuários
        const solicitanteUser = await prisma.user.findUnique({ where: { id: solicitanteId } });
        const solicitadoUser = await prisma.user.findUnique({ where: { id: solicitadoId } });

        if (!solicitanteUser || !solicitadoUser) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        // Buscar registros de Profissional relacionados aos usuários (foreign keys da tabela ConexaoProfissional)
        const solicitanteProf = await prisma.profissional.findUnique({ where: { usuario_id: solicitanteId } });
        const solicitadoProf = await prisma.profissional.findUnique({ where: { usuario_id: solicitadoId } });

        if (!solicitanteProf || !solicitadoProf) {
            return res.status(404).json({ error: 'Profissional associado ao usuário não encontrado.' });
        }

        // Verificando se já existe uma solicitação de amizade enviada do solicitante para solicitado (usa ids de profissional)
        const existente = await prisma.conexaoProfissional.findFirst({ where: { solicitante_id: solicitanteProf.id, solicitado_id: solicitadoProf.id } });

        if (existente) {
            return res.status(409).json({ error: "Solicitação de amizade já enviada." });
        }

        // Criando a solicitação de amizade (ConexaoProfissional)
    const novaSolicitacao = await prisma.conexaoProfissional.create({ data: { solicitante_id: solicitanteProf.id, solicitado_id: solicitadoProf.id } });

    return res.status(201).json(novaSolicitacao);
    } catch (error) {
    console.error('Erro ao enviar solicitação:', error);
    // Retornar mensagem de erro detalhada em desenvolvimento
    return res.status(500).json({ error: 'Erro interno ao enviar solicitação', details: (error as Error).message });
    }
}