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
      locais: profissional.locaisAtendimento || [],
      redesSociais: profissional.redesSociais || [],
      areasAtuacao: profissional.areasAtuacao || [],
      // Mapear redes sociais para o formato esperado pelo frontend
      redes: profissional.redesSociais?.reduce((acc, rede) => {
        if (rede.tipo && rede.url) {
          acc[rede.tipo.toLowerCase()] = rede.url;
        }
        return acc;
      }, {} as Record<string, string>) || {},
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

  async updateByUserId(usuarioId: number, updateData: UpdateProfissionalDto) {
    // Verificar se o usuário existe
    const user = await this.prisma.user.findUnique({
      where: { id: usuarioId },
    });

    if (!user) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    // Preparar dados do usuário para atualização
    const userUpdateData: any = {};
    if (updateData.nome) userUpdateData.name = updateData.nome;
    if (updateData.email) userUpdateData.email = updateData.email;
    if (updateData.telefone) userUpdateData.telefone = updateData.telefone;

    // Atualizar dados básicos do usuário se necessário
    if (Object.keys(userUpdateData).length > 0) {
      await this.prisma.user.update({
        where: { id: usuarioId },
        data: userUpdateData,
      });
    }

    // Verificar se já existe perfil profissional
    let profissional = await this.prisma.profissional.findUnique({
      where: { usuario_id: usuarioId },
    });

    // Preparar dados do profissional
    const profissionalData: any = {};
    if (updateData.especialidade) profissionalData.especialidade = updateData.especialidade;
    if (updateData.registroProfissional) profissionalData.registro_profissional = updateData.registroProfissional;
    if (updateData.titulo) profissionalData.titulo = updateData.titulo;
    if (updateData.formacaoAcademica) profissionalData.formacaoAcademica = updateData.formacaoAcademica;
    if (updateData.sobre) profissionalData.sobre = updateData.sobre;
    if (updateData.fotoPerfilUrl) profissionalData.fotoPerfilUrl = updateData.fotoPerfilUrl;
    if (updateData.codigoIdentificacao) profissionalData.codigoIdentificacao = updateData.codigoIdentificacao;

    if (!profissional) {
      // Criar novo perfil profissional com dados padrão
      profissional = await this.prisma.profissional.create({
        data: {
          usuario_id: usuarioId,
          especialidade: updateData.especialidade || 'Não informado',
          registro_profissional: updateData.registroProfissional || 'Não informado',
          ...profissionalData,
        },
      });
    } else {
      // Atualizar perfil profissional existente
      if (Object.keys(profissionalData).length > 0) {
        profissional = await this.prisma.profissional.update({
          where: { id: profissional.id },
          data: profissionalData,
        });
      }
    }

    // Retornar o perfil atualizado
    const perfilAtualizado = await this.findByUserId(usuarioId);
    return {
      message: 'Perfil atualizado com sucesso!',
      data: perfilAtualizado,
    };
  }
}
