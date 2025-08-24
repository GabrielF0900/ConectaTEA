import { Request, Response } from "express";
import prisma from "../../lib/prisma";

export async function ListarConexoesPorProfissional(req: Request, res: Response) {
  // Aceita profissionalId (por profissional.id) ou usuarioId (converte para profissional.id)
  const profissionalIdQuery = req.query.profissionalId ? Number(req.query.profissionalId) : undefined;
  const usuarioIdQuery = req.query.usuarioId ? Number(req.query.usuarioId) : undefined;
  const currentUserId = (req as any).user?.userId as number | undefined;

  try {
    let profissionalId = profissionalIdQuery;

    if (!profissionalId) {
      const usuarioId = currentUserId ?? usuarioIdQuery;
      if (!usuarioId || !Number.isInteger(usuarioId)) {
        return res.status(400).json({ error: 'profissionalId ou usuarioId inválido ou ausente.' });
      }
      let prof = await prisma.profissional.findUnique({ where: { usuario_id: usuarioId } });
      if (!prof) {
        const user = await prisma.user.findUnique({ where: { id: usuarioId } });
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });
        if (user.tipo === 'PROFISSIONAL') {
          try {
            console.log('[ListarConexoesPorProfissional] criando Profissional mínimo para usuario:', usuarioId);
            prof = await prisma.profissional.create({ data: { usuario_id: usuarioId, especialidade: 'Não informado', registro_profissional: 'N/A' } });
          } catch (e: any) {
            console.warn('[ListarConexoesPorProfissional] falha ao criar Profissional (talvez criado por outro processo):', e?.message ?? e);
            prof = await prisma.profissional.findUnique({ where: { usuario_id: usuarioId } });
          }
        } else {
          return res.status(404).json({ error: 'Profissional não encontrado para o usuário.' });
        }
      }
  if (!prof) return res.status(404).json({ error: 'Profissional não encontrado após tentativa de criação.' });
  profissionalId = prof.id;
    }

    if (!Number.isInteger(profissionalId)) return res.status(400).json({ error: 'profissionalId inválido.' });

    const conexoes = await prisma.conexaoProfissional.findMany({
      where: {
        status: 'ACEITO',
        OR: [
          { solicitante_id: profissionalId },
          { solicitado_id: profissionalId }
        ]
      },
      orderBy: { criado_em: 'desc' },
      include: {
        solicitante: { include: { usuario: true } },
        solicitado: { include: { usuario: true } }
      }
    });

    return res.json(conexoes);
  } catch (error) {
    console.error('Erro listando conexões:', error);
    return res.status(500).json({ error: 'Erro interno ao listar conexões', details: (error as Error).message });
  }
}
