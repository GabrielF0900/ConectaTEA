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

    //Colocando valor padrao apos registro de conta desses campos.
    const camposComValorPadrao = {
        titulo: "Título Padrão",
        formacaoAcademica: '',
        sobre: "Sobre Padrão",
        fotoPerfilUrl: "https://exemplo.com/foto-perfil.jpg",
        codigoIdentificacao: "PROF-001",
        registro_profissional: "Registro Padrão",
        email: "email@exemplo.com",
        telefone: "0000-0000"
    };

    // Atualizando os campos com os valores do corpo da requisição ou os valores padrão
    const dadosAtualizados = {
        nome,
        especialidade,
        ...camposComValorPadrao
    };
}