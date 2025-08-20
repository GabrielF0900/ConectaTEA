//Algoritmo onde irá retornar todos os dados da criança pelo ID.


import {Request, Response} from "express";
import prisma from "../../lib/prisma";

export async function ReadCrianca(req: Request, res: Response) {
    //Encontrando a criança pelo ID, transformando em Inteiro e atribuindo a constante.
    const criancaId = parseInt
}
''