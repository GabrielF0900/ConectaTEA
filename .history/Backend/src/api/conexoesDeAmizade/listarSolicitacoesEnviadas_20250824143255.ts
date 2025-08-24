import { Request, Response } from "express";
import prisma from "../../lib/prisma";

export async function ListarSolicitacoesEnviadas(req: Request, res: Response) {
  const usuarioId = req.query.usuarioId ? Number(req.query.usuarioId) : undefined;

  try {
    if (!usuarioId || !Number.isInteger(usuarioId)) {
      return res.status(400).json({ error: 'usuarioId inválido ou ausente.' });
    }

    const prof = await prisma.profissional.findUnique({ where: { usuario_id: usuarioId } });
    if (!prof) return res.status(404).json({ error: 'Profissional não encontrado para o usuário.' });

    const solicitacoes = await prisma.conexaoProfissional.findMany({
      where: { solicitante_id: prof.id },
      orderBy: { criado_em: 'desc' },
      include: {
        solicitado: {
          include: { usuario: true }
        }
      }
    });

    return res.json(solicitacoes);
  } catch (error) {
    console.error('Erro listando solicitações enviadas:', error);
    return res.status(500).json({ error: 'Erro interno ao listar solicitações enviadas', details: (error as Error).message });
  }
}
