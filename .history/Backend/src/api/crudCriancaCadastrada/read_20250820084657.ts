//Algoritmo onde irá retornar todos os dados da criança pelo ID.


import {Request, Response} from "express";
import prisma from "../../lib/prisma";

export async function ReadCrianca(req: Request, res: Response) {
    //Encontrando a criança pelo ID, transformando em Inteiro e atribuindo a constante.
    const criancaId = parseInt(req.params.id);
    //Retornando criança com todos os dados.
    const crianca = await prisma.crianca.findUnique({
        where: { id: criancaId }
    })

    //Validando se criança foi encontrada com sucesso.
    if(!crianca) {
        return res.status(404).json({
            message: "Criança não encontrada."
        });
    } 

    //Se crianca foi encontrada, retornamos os dados dela.
    re
}
''