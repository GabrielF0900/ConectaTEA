//Algoritmo para registro de usuarios com criptografia de senha.

import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../lib/prisma';
import { UserType } from '@prisma/client';

export async function registerUser(req: Request, res: Response) {
    //Desestruturando os chunks do corpo da requisição
    const { name, email, password, tipo } = req.body;

    //Verificando se os nomes estao preenchidos devidamente.

    if(!name || !email || !password || !tipo) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    // Converter tipo para maiúscula e validar se é válido
    const tipoUpperCase = tipo.toUpperCase();
    if (!Object.values(UserType).includes(tipoUpperCase)) {
        return res.status(400).json({ 
            message: 'Tipo de usuário inválido. Use: PROFISSIONAL ou RESPONSAVEL.' 
        });
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
            tipo: tipoUpperCase
        }
    })

    return res.status(201).json({ 
        message: 'Usuário registrado com sucesso.',
        user: {
            id: novoUsuario.id,
            name: novoUsuario.name,
            email: novoUsuario.email,
            tipo: novoUsuario.tipo
        }
    });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        return res.status(500).json({ 
            message: 'Erro ao registrar usuário.',
            error: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
}