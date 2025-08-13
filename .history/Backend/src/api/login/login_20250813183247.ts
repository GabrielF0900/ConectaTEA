//Algoritmo de login e criação de token jwt.


import {Response, Request} from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../../lib/prisma';

export async function loginUser(req: Request, res: Response) {
    //Desestruturando os chunks do corpo da requisição.

    const {email, password} = req.body;

    //Verificando se os dados foram devidamente preenchidos.
    if()
}