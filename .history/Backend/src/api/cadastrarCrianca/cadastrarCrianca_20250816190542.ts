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
    //Desestruturando os chunks do corpo da requisição da criança
    const { fullName, birthDate, gender, diagnosis, notes, responsible } = req.body as CreateChildDTO;

    // Aqui você pode implementar a lógica para cadastrar a criança usando os dados desestruturados

    //Validando se os dados foram devidamente preenchidos
    if(!fullName || !birthDate || !gender || !diagnosis || !responsible) {
        return res.status(400).json({ message: "Dados inválidos." });
    }

    // Aqui você pode implementar a lógica para cadastrar a criança usando os dados desestruturados

    try {
        //Lógica para cadastrar a 
    } catch (error) {
        
    }
}