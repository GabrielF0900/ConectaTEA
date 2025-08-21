//Algoritmo para atualizar uma criança cadastrada

import {Request, Response} from "express";
import prisma from "../../lib/prisma";

export async function UpdateCrianca(req: Request, res: Response) {
    //Identificando a criança pelo id.
    const {id} = req.params;
    //Pegando os dados novos para atualizar.
    const dados = req.body;

    //Validando 
}