//Algoritmo de criação de token. Ele criará o token e irá armazenar no header da requisição


import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

export function createToken(req: Request, res: Response, next: NextFunction): Promise<string> {

    return new Promise ((resolve, reject) => {
        const userId = req.user?.id;

        if (!userId) {
            return reject(new Error('User ID not found'));
        }

        const token = jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
            expiresIn: '1h',
        });

        res.setHeader('Authorization', `Bearer ${token}`);
        resolve(token);
    });
}