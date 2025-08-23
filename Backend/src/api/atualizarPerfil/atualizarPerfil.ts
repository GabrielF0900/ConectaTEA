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

        // Verifica se o usuário existe (evita atualizar profissional de usuário inexistente)
        const usuarioExistente = await prisma.user.findUnique({ where: { id } });
        if (!usuarioExistente) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Atualiza ou cria os dados do profissional (tabela Profissional)
        // Usa upsert para evitar erro P2025 quando não houver registro pré-existente
        const profissionalAtualizado = await prisma.profissional.upsert({
            where: { usuario_id: id },
            update: {
                especialidade,
                titulo,
                formacaoAcademica,
                sobre,
                fotoPerfilUrl,
                codigoIdentificacao,
                registro_profissional
            },
            create: {
                usuario_id: id,
                especialidade: especialidade ?? '',
                registro_profissional: registro_profissional ?? '',
                titulo,
                formacaoAcademica,
                sobre,
                fotoPerfilUrl,
                codigoIdentificacao
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
