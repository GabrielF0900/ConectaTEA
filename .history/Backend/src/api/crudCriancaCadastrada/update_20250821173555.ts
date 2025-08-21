//Algoritmo para atualizar uma criança cadastrada

import {Request, Response} from "express";
import prisma from "../../lib/prisma";

export async function UpdateCrianca(req: Request, res: Response) {
    //Identificando a criança pelo id.
    const {id} = req.params;
    //Pegando os dados novos para atualizar.
    const dados = req.body;

    try {
        //Verificando se os dados foram encontrados no banco de dados.
        const dadosEncontrados = await prisma.crianca.findUnique({
            where: {
                id: Number(id)
            }
        })

        //Se os dados nao forem encontrados, retorna erro.
        if()
    } catch (error) {
        
    }
}