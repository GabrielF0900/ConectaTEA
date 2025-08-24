import { Request, Response } from 'express';
import prisma from '../../lib/prisma';

export async function listarProfissionaisHandler(req: Request, res: Response) {
  try {
    const search = (req.query.search as string) || undefined;
    const usuarioId = req.query.usuarioId ? Number(req.query.usuarioId) : undefined;

    const where: any = {};

    if (usuarioId) {
      where.usuario_id = usuarioId;
    }

    if (search) {
      // busca por nome ou especialidade (case-insensitive, contains)
      where.OR = [
        { nome: { contains: search, mode: 'insensitive' } },
        { especialidade: { contains: search, mode: 'insensitive' } }
      ];
    }

    const profissionais = await prisma.profissional.findMany({
      where,
      orderBy: { id: 'desc' }
    });

    res.json(profissionais);
  } catch (error) {
    console.error('Erro ao listar profissionais:', error);
    res.status(500).json({ error: 'Erro ao listar profissionais' });
  }
}
