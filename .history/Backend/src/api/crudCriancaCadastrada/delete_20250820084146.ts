//Algoritmo de Delete que faz parte do CRUD de Cadastro de Criança.

import {Request, Response} from "express";
import prisma from "../../lib/prisma";

export async function DeleteCrianca(req: Request, res: Response) {
    // Lógica para excluir uma criança

    //Buscando a criança pelo ID
    const criancaId = parseInt(req.params.id);
    const crianca = await prisma.crianca.findUnique({
        where: { id: criancaId }
    })

    //Validando se 
}