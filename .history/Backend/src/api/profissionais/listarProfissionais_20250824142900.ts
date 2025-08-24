import { Request, Response } from 'express';
import prisma from '../../lib/prisma';

export async function listarProfissionaisHandler(req: Request, res: Response) {
  try {
    // Permite bypass em ambiente de desenvolvimento quando ?__public=1 for usado
    if (req.query.__public === '1') {
      // continua sem verificar token (apenas para teste local)
    }
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
      orderBy: { id: 'desc' },
      include: {
        usuario: {
          select: { id: true, name: true, email: true, telefone: true, endereco: true }
        },
        locaisAtendimento: true,
        redesSociais: true,
        areasAtuacao: {
          include: {
            area: true
          }
        }
      }
    });

    // Mapear para incluir nome/email/telefone do usuário e estruturar áreas/redes/localidades de forma consistente
    const mapped = profissionais.map((p) => ({
      id: p.id,
      usuario_id: p.usuario_id,
      nome: p.usuario?.name ?? null,
      email: p.usuario?.email ?? null,
      telefone: p.usuario?.telefone ?? null,
      especialidade: p.especialidade,
      registro_profissional: p.registro_profissional,
      titulo: p.titulo,
      formacaoAcademica: p.formacaoAcademica,
      sobre: p.sobre,
      fotoPerfilUrl: p.fotoPerfilUrl,
      codigoIdentificacao: p.codigoIdentificacao,
      locais: (p.locaisAtendimento || []).map(l => ({ id: l.id, nome: l.nome, cidade: l.cidade })),
      redes: (p.redesSociais || []).reduce((acc: any, r) => {
        // usar o tipo como chave possível (linkedin, instagram, facebook)
        const key = (r.tipo || '').toLowerCase();
        acc[key] = r.url ?? null;
        return acc;
      }, {}),
      areas: (p.areasAtuacao || []).map(a => a.area?.nome).filter(Boolean)
    }));

    res.json(mapped);
  } catch (error) {
    console.error('Erro ao listar profissionais:', error);
    res.status(500).json({ error: 'Erro ao listar profissionais' });
  }
}
