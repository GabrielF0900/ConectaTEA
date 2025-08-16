//Algoritmo para cadastrar criança no ConectaTEA

import {Request, Response} from "express";

export interface ResponsibleDTO {
  name: string;
  phone: string;
  email?: string;
  address?: string;
}




export function CadastrarCrianca(req: Request, res: Response) {
    //Desestruturando os chunks do corpo da requisição
    const {name, idade, responsavel, ultimaSessao} = req.body
}