//Algoritmo para cadastrar criança no ConectaTEA

import {Request, Response} from "express";

export interface ResponsibleDTO {
  name: string;
  phone: string;
  email?: string;
  address?: string;
}

export interface CreateChildDTO {
  fullName: string;
  birthDate: string; // yyyy-mm-dd (vindo do form)
  gender: "M" | "F" | "Outro";
  diagnosis: string;
  notes?: string;
  responsible: ResponsibleDTO;
}


export function CadastrarCrianca(req: Request, res: Response) {
    //Desestruturando os chunks do corpo da requisição
    
}