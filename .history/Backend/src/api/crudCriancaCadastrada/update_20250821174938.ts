import { Request, Response } from "express";
import prisma from "../../lib/prisma";

export async function UpdateCrianca(req: Request, res: Response) {
    const { id } = req.params; // Identificando a criança pelo id
    const dados = req.body;    // Pegando os dados novos para atualizar

    try {
        // Verificando se a criança existe
        const criancaExistente = await prisma.crianca.findUnique({
            where: { id: Number(id) },
            include: { responsavel: true }
        });

        if (!criancaExistente) {
            return res.status(404).json({ message: "Criança não encontrada." });
        }

        // Extrair dados da criança e do responsável do body
        const { responsavel, ...dadosCrianca } = dados;

        // Preparar dados para atualização da criança
        const dadosCriancaAtualizada = {
            nome: dadosCrianca.nome,
            data_nascimento: new Date(dadosCrianca.dataNascimento),
            genero: dadosCrianca.genero,
            diagnostico: dadosCrianca.diagnostico,
            observacoes: dadosCrianca.observacoes,
            parentesco: dadosCrianca.parentesco
        };

        // Atualizar dados do responsável se fornecidos
        if (responsavel) {
            await prisma.user.update({
                where: { id: criancaExistente.responsavel_id },
                data: {
                    name: responsavel.nome,
                    telefone: responsavel.telefone,
                    email: responsavel.email,
                    endereco: responsavel.endereco
                }
            });
        }

        // Atualizando a criança
        const criancaAtualizada = await prisma.crianca.update({
            where: { id: Number(id) },
            data: dadosCriancaAtualizada,
            include: {
                responsavel: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        telefone: true,
                        endereco: true
                    }
                }
            }
        });

        return res.status(200).json({ 
            message: "Criança atualizada com sucesso!",
            crianca: criancaAtualizada 
        });
    } catch (error) {
        console.error('Erro ao atualizar criança:', error);
        return res.status(500).json({ message: "Erro ao atualizar criança." });
    }
}
