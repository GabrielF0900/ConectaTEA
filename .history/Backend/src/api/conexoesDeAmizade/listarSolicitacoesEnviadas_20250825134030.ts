import { Request, Response } from "express";
import prisma from "../../lib/prisma";

export async function ListarSolicitacoesEnviadas(req: Request, res: Response) {
  // Preferir usuário autenticado para evitar spoofing
  const usuarioIdQuery = req.query.usuarioId ? Number(req.query.usuarioId) : undefined;
  const currentUserId = (req as any).user?.userId as number | undefined;
  const usuarioId = currentUserId ?? usuarioIdQuery;

  try {
    if (!usuarioId || !Number.isInteger(usuarioId)) {
      return res.status(400).json({ error: 'usuarioId inválido ou ausente.' });
    }

    let prof = await prisma.profissional.findUnique({ where: { usuario_id: usuarioId } });
    if (!prof) {
      const user = await prisma.user.findUnique({ where: { id: usuarioId } });
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });
      if (user.tipo === 'PROFISSIONAL') {
        try {
          console.log('[ListarSolicitacoesEnviadas] criando Profissional mínimo para usuario:', usuarioId);
          prof = await prisma.profissional.create({ data: { usuario_id: usuarioId, especialidade: 'Não informado', registro_profissional: 'N/A' } });
        } catch (e: any) {
          console.warn('[ListarSolicitacoesEnviadas] falha ao criar Profissional (talvez criado por outro processo):', e?.message ?? e);
          prof = await prisma.profissional.findUnique({ where: { usuario_id: usuarioId } });
        }
      } else {
        return res.status(404).json({ error: 'Profissional não encontrado para o usuário.' });
      }
    }

    if (!prof) return res.status(404).json({ error: 'Profissional não encontrado após tentativa de criação.' });

    const solicitacoes = await prisma.conexaoProfissional.findMany({
      where: { solicitante_id: prof.id, status: 'PENDENTE' },
      orderBy: { criado_em: 'desc' },
      include: {
        solicitante: { include: { usuario: true } },
        solicitado: { include: { usuario: true } }
      }
    });

    // Mapear e adicionar flag canRespond: true apenas se o usuário autenticado for o destinatário
    const mapped = solicitacoes.map(s => ({
      ...s,
      canRespond: currentUserId ? currentUserId === s.solicitado.usuario_id : false
    }));

    return res.json(mapped);
  } catch (error) {
    console.error('Erro listando solicitações enviadas:', error);
    return res.status(500).json({ error: 'Erro interno ao listar solicitações enviadas', details: (error as Error).message });
  }
}
