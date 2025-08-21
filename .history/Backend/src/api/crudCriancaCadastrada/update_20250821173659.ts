import { Request, Response } from "express";
import prisma from "../../lib/prisma";

export async function UpdateCrianca(req: Request, res: Response) {
    const { id } = req.params; // Identificando a criança pelo id
    const dados = req.body;    // Pegando os dados novos para atualizar

    try {
        // Verificando se a criança existe
        const criancaExistente = await prisma.crianca.findUnique({
            where: { id: Number(id) }
        });

        if (!criancaExistente) {
            return res.status(404).json({ message: "Criança não encontrada." });
        }

        // Atualizando a criança
        const criancaAtualizada = await prisma.crianca.update({
            where: { id: Number(id) },
            data: dados
        });

        return res.status(200).json(criancaAtualizada); // Retorna os dados atualizados
    } catch (error) {
        console.error(error); // Opcional: log do erro
        return res.status(500).json({ message: "Erro ao atualizar criança." });
    }
}
