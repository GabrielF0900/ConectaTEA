//Algoritmo de login e criação de token jwt.

import {Response, Request} from 'express';
import bcrypt from 'bcrypt';
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
        //Verificando se email existe no banco
        const usuario = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        
        if(!usuario) {
            return res.status(400).json({ message: 'Email não registrado.' });
        }

        //Verificando se a senha está correta
        const senhaCorreta = await bcrypt.compare(password, usuario.password);
        
        if(!senhaCorreta) {
            return res.status(400).json({ message: 'Senha incorreta.' });
        }

        // Criando o token JWT
        const token = jwt.sign(
            { 
                userId: usuario.id, 
                email: usuario.email,
                tipo: usuario.tipo 
            },
            process.env.JWT_SECRET || 'chave-secreta-padrao',
            { expiresIn: '24h' }
        );

        return res.status(200).json({
            message: 'Login realizado com sucesso.',
            token: token,
            user: {
                id: usuario.id,
                name: usuario.name,
                email: usuario.email,
                tipo: usuario.tipo
            }
        });

        //Salva token na requisi

    } catch (error) {
        console.error('Erro no login:', error);
        return res.status(500).json({ 
            message: 'Erro interno do servidor.',
            error: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
}