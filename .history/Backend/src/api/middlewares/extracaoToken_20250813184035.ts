//Algoritmo para extração de token

import {Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';


export function extracaoToken(req: Request, res: Response, next: NextFunction) {
    //Pegando o token do header da requisição

    const token = req.headers.authorization?.split(' ')[1];
}