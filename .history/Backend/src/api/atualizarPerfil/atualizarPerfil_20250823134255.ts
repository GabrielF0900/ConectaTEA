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

    try {
        //Colocando valor padrao apos registro de conta desses campos.
        const camposComValorPadrao = {
            titulo: '',
            formacaoAcademica: '',
            sobre: '',
            fotoPerfilUrl: '',
            codigoIdentificacao: '",
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
    } catch (error) {
        console.error("Erro ao atualizar perfil:", error);
        res.status(500).json({ error: "Erro ao atualizar perfil" });
    }
}