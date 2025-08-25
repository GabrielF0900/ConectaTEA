import { Request, Response } from 'express';
import prisma from '../../lib/prisma';

export async function listarProfissionaisHandler(req: Request, res: Response) {
  try {
  console.log('[listarProfissionais] query:', req.query);
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
      // busca por nome do usuário relacionado (usuario.name) ou especialidade
      // (case-insensitive, contains)
      where.OR = [
        { usuario: { name: { contains: search, mode: 'insensitive' } } },
        { especialidade: { contains: search, mode: 'insensitive' } }
      ];
    }

    const profissionais = await prisma.profissional.findMany({
      where,
      orderBy: { id: 'desc' },
      include: {
        usuario: {
          select: { id: true, name: true, email: true, telefone: true, endereco: true, criado_em: true }
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

    // Mapear para expor todos os dados públicos do perfil de forma clara e consistente
    const mapped = profissionais.map((p) => {
      const redesArray = (p.redesSociais || []).map(r => ({ id: r.id, tipo: r.tipo, url: r.url }));
      const redesMap = redesArray.reduce((acc: any, r) => {
        const key = String(r.tipo || '').toLowerCase();
        acc[key] = r.url ?? null;
        return acc;
      }, {});

      const locais = (p.locaisAtendimento || []).map(l => ({ id: l.id, nome: l.nome, cidade: l.cidade }));

      const areas = (p.areasAtuacao || []).map(a => ({ id: a.area?.id, nome: a.area?.nome })).filter(a => a.nome);

      return {
        // campos primários do profissional
        id: p.id,
        usuario_id: p.usuario_id,
        especialidade: p.especialidade,
        registro_profissional: p.registro_profissional,
        titulo: p.titulo,
        formacaoAcademica: p.formacaoAcademica,
        sobre: p.sobre,
        fotoPerfilUrl: p.fotoPerfilUrl,
        codigoIdentificacao: p.codigoIdentificacao,

        // dados do usuário relacionado
        usuario: p.usuario ? {
          id: p.usuario.id,
          nome: p.usuario.name,
          email: p.usuario.email ?? null,
          telefone: p.usuario.telefone ?? null,
          endereco: p.usuario.endereco ?? null,
          criado_em: p.usuario.criado_em
        } : null,

  // campos de compatibilidade legados (mantém API anterior)
  nome: p.usuario?.name ?? null,
  email: p.usuario?.email ?? null,
  telefone: p.usuario?.telefone ?? null,
  endereco: p.usuario?.endereco ?? null,
  criado_em: p.usuario?.criado_em ?? null,

        // relações enriquecidas
        locais,              // array de locais com id/nome/cidade
        redes: redesMap,     // mapa por tipo (ex: linkedin, instagram)
        redesArray,          // array original de redes (id, tipo, url)
        areas,               // array de { id, nome }
      };
    });

    res.json(mapped);
  } catch (error) {
    console.error('Erro ao listar profissionais:', error);
    res.status(500).json({ error: 'Erro ao listar profissionais' });
  }
}
