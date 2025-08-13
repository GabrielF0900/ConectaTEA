//Algoritmo para extração de token

import {Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import prisma from "../../lib/prisma";

export function extracaoToken(req: Request, res: Response, next: NextFunction) {
    //Pegando o token do header da requisição

    const token = req.headers.authorization?.split(' ')[1];

    //Validando se o token existe.
    if(!token) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }

    //Verificando o formato do token.
    if(token.length !==  JWT_LENGTH) {
        return res.status(401).json({ message: 'Token inválido.' });
    }

    //Verificando a validade do token.
    jwt.verify(token, process.env.JWT_SECRET || 'chave-secreta-padrao', (err, decoded) => {
        if(err) {
            return res.status(401).json({ message: 'Token inválido.' });
        }

        //Se o token for válido, adicionamos as informações do usuário à requisição.
        req.user = decoded;
        next();
    });
}