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

    try {
        //Verifica se o email está registrado no banco de dados.
    const emailExistente = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if(emailExistente) {
        return res.status(400).json({ message: 'Email já registrado.' });
    }

    //Criptografando a senha.
    const senhaCriptografada = await bcrypt.hash(password, 10);

    //Criando o usuário no banco de dados.
    const novoUsuario = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: senhaCriptografada,
            tipo: tipo
        }
    })

    return res.status(201).json({ message: 'Usuário registrado com sucesso.' });
    } catch (error) {
        //Se acontecer algum erro, será retornado.
        return res.status(500).json({ message: 'Erro ao registrar usuário.' });
    }
}