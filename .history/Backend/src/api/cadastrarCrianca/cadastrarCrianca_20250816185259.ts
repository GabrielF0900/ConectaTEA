//Algoritmo para cadastrar criança no ConectaTEA

import {Request, Response} from "express";

export function CadastrarCrianca(req: Request, res: Response) {
    //Desestruturando os chunks do corpo da requisição
    const {name, idade, responsavel, ultimaSessao} = req.body
}