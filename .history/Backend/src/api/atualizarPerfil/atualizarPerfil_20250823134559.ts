import { Request, Response } from "express";
import prisma from "../../lib/prisma";

export async function AtualizarPerfil(req: Request, res: Response) {
    const id = Number(req.params.id);

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
        // Atualiza os dados do usuário (tabela User)
        const usuarioAtualizado = await prisma.user.update({
            where: { id },
            data: {
                name: nome,
                email,
                telefone
            }
        });

        // Atualiza os dados do profissional (tabela Profissional)
        const profissionalAtualizado = await prisma.profissional.update({
            where: { usuario_id: id },
            data: {
                especialidade,
                titulo,
                formacaoAcademica,
                sobre,
                fotoPerfilUrl,
                codigoIdentificacao,
                registro_profissional
            }
        });

        res.json({
            message: "Perfil atualizado com sucesso",
            usuario: usuarioAtualizado,
            profissional: profissionalAtualizado
        });

    } catch (error) {
        console.error("Erro ao atualizar perfil:", error);
        res.status(500).json({ error: "Erro ao atualizar perfil" });
    }
}
