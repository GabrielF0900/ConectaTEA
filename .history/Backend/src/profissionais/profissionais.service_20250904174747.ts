import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfissionalDto } from './dto/update-profissional.dto';

@Injectable()
export class ProfissionaisService {
  constructor(private prisma: PrismaService) {}

  async findByUserId(usuarioId: number) {
    const profissional = await this.prisma.profissional.findUnique({
      where: { usuario_id: usuarioId },
      include: {
        usuario: {
          select: {
            id: true,
            name: true,
            email: true,
            telefone: true,
            endereco: true,
            tipo: true,
          },
        },
        locaisAtendimento: true,
        redesSociais: true,
        areasAtuacao: {
          include: {
            area: true,
          },
        },
      },
    });

    if (!profissional) {
      // Se não existe profissional, retorna null em vez de dar erro
      return null;
    }

    // Mapear dados para o formato esperado pelo frontend
    return {
      id: profissional.id,
      usuarioId: profissional.usuario_id,
      nome: profissional.usuario.name,
      email: profissional.usuario.email,
      telefone: profissional.usuario.telefone,
      endereco: profissional.usuario.endereco,
      especialidade: profissional.especialidade,
      registroProfissional: profissional.registro_profissional,
      titulo: profissional.titulo,
      formacaoAcademica: profissional.formacaoAcademica,
      sobre: profissional.sobre,
      fotoPerfilUrl: profissional.fotoPerfilUrl,
      codigoIdentificacao: profissional.codigoIdentificacao,
      locais: profissional.locaisAtendimento,
      redesSociais: profissional.redesSociais,
      areasAtuacao: profissional.areasAtuacao,
    };
  }

  async findAll() {
    const profissionais = await this.prisma.profissional.findMany({
      include: {
        usuario: {
          select: {
            id: true,
            name: true,
            email: true,
            telefone: true,
            endereco: true,
          },
        },
        locaisAtendimento: true,
        redesSociais: true,
        areasAtuacao: {
          include: {
            area: true,
          },
        },
      },
    });

    return profissionais.map(profissional => ({
      id: profissional.id,
      usuarioId: profissional.usuario_id,
      nome: profissional.usuario.name,
      email: profissional.usuario.email,
      telefone: profissional.usuario.telefone,
      endereco: profissional.usuario.endereco,
      especialidade: profissional.especialidade,
      registroProfissional: profissional.registro_profissional,
      titulo: profissional.titulo,
      formacaoAcademica: profissional.formacaoAcademica,
      sobre: profissional.sobre,
      fotoPerfilUrl: profissional.fotoPerfilUrl,
      codigoIdentificacao: profissional.codigoIdentificacao,
      locais: profissional.locaisAtendimento,
      redesSociais: profissional.redesSociais,
      areasAtuacao: profissional.areasAtuacao,
    }));
  }
}
