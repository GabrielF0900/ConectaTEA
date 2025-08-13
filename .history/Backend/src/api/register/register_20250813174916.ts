//Algoritmo para registro de usuarios com criptografia de senha.

import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../lib/prisma';

export async function registerUser(req: Request, res: Response) {
    //Desestruturando os chunks do corpo da requisição
    const {name, email, password} = req.body;

    //Verificando se os nomes estao preenchidos devidamente.

    if(!name || !email || !password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    //Verifica se o email está registrado no banco de dados.
    const emailExistente = await prisma.user.findUnique({
        where: email
    })
}