//Algoritmo que permitirá atualizar o perfil.

import {Request, Response} from "express";

export async function AtualizarPerfil(req: Request, res: Response) {
    //Acessando o usuário pelo id.
    const id = req.params.id;

    //Desestruturando os chunks do corpo da requisição.

    const {
        nome,
        especialidade,
        titulo,
        formacaoAcademica,
        sobre,
        fotoPerfilUrl,
        codigoIdentificacao,
        registro_profissional,
        email,
        telefone
    } = req.body;

   try