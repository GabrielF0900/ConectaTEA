//Algoritmo de login e criação de token jwt.


import {Response, Request} from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../../lib/prisma';

export async function loginUser(req: Request, res: Response) {
    //Desestruturando os chunks do corpo da requisição.

    const {email, password} = req.body;

    //Verificando se os dados foram devidamente preenchidos.
    if(!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    try {
        //Verificando se email está correto
        const emailCorreto = await prisma.user.find
    } catch (error) {
        
    }
}