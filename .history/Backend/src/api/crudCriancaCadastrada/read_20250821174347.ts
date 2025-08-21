//Algoritmo onde irá retornar todos os dados da criança pelo ID.

import {Request, Response} from "express";
import prisma from "../../lib/prisma";

export async function ReadCrianca(req: Request, res: Response) {
    //Encontrando a criança pelo ID, transformando em Inteiro e atribuindo a constante.
    const criancaId = parseInt(req.params.id);
    
    try {
        //Retornando criança com todos os dados incluindo responsável.
        const crianca = await prisma.crianca.findUnique({
            where: { id: criancaId },
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

        //Validando se criança foi encontrada com sucesso.
        if(!crianca) {
            return res.status(404).json({
                message: "Criança não encontrada."
            });
        } 

        // Formatando a resposta para o frontend
        const criancaFormatada = {
            id: crianca.id,
            nome: crianca.nome,
            idade: new Date().getFullYear() - new Date(crianca.data_nascimento).getFullYear(),
            dataNascimento: crianca.data_nascimento.toISOString().split('T')[0],
            genero: crianca.genero,
            diagnostico: crianca.diagnostico,
            observacoes: crianca.observacoes,
            parentesco: crianca.parentesco,
            responsavel: {
                id: crianca.responsavel.id,
                nome: crianca.responsavel.name,
                email: crianca.responsavel.email,
                telefone: crianca.responsavel.telefone,
                endereco: crianca.responsavel.endereco
            }
        };

        //Se crianca foi encontrada, retornamos os dados dela.
        return res.status(200).json({
            message: "Criança encontrada com sucesso.",
            data: criancaFormatada
        });
    } catch (error) {
        console.error('Erro ao buscar criança:', error);
        return res.status(500).json({
            message: "Erro interno do servidor."
        });
    }
}
''