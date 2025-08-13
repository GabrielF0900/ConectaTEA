//Algoritmo de criação de token. Ele criará o token e irá armazenar no header da requisição


import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

export function createToken(req: Request, res: Response, next: NextFunction): Promise<string> {}