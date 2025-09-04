import { Injectable, BadRequestException, ConflictException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateConexaoDto } from './dto/create-conexao.dto';
import { UpdateConexaoDto, AcaoConexao } from './dto/update-conexao.dto';
import { StatusConexao } from '@prisma/client';

@Injectable()
export class ConexoesService {
  constructor(private prisma: PrismaService) {}

  async enviarSolicitacao(usuarioId: number, createConexaoDto: CreateConexaoDto) {
    // Buscar o profissional que está enviando a solicitação
    const profissionalOrigem = await this.prisma.profissional.findUnique({
      where: { usuario_id: usuarioId },
    });

    if (!profissionalOrigem) {
      throw new BadRequestException('Perfil profissional não encontrado.');
    }

    // Verificar se o profissional destino existe
    const profissionalDestino = await this.prisma.profissional.findUnique({
      where: { id: createConexaoDto.profissionalDestinoId },
    });

    if (!profissionalDestino) {
      throw new BadRequestException('Profissional destino não encontrado.');
    }

    // Verificar se não está tentando enviar para si mesmo
    if (profissionalOrigem.id === profissionalDestino.id) {
      throw new BadRequestException('Você não pode enviar solicitação para si mesmo.');
    }

    // Verificar se já existe uma conexão entre eles
    const conexaoExistente = await this.prisma.conexaoProfissional.findFirst({
      where: {
        OR: [
          {
            profissional_origem_id: profissionalOrigem.id,
            profissional_destino_id: profissionalDestino.id,
          },
          {
            profissional_origem_id: profissionalDestino.id,
            profissional_destino_id: profissionalOrigem.id,
          },
        ],
      },
    });

    if (conexaoExistente) {
      throw new ConflictException('Já existe uma conexão entre estes profissionais.');
    }

    // Criar a solicitação
    const novaConexao = await this.prisma.conexaoProfissional.create({
      data: {
        profissional_origem_id: profissionalOrigem.id,
        profissional_destino_id: profissionalDestino.id,
        status: StatusConexao.PENDENTE,
        data_solicitacao: new Date(),
      },
      include: {
        profissionalOrigem: {
          include: {
            usuario: {
              select: {
                id: true,
                name: true,
                email: true,
                telefone: true,
              },
            },
          },
        },
        profissionalDestino: {
          include: {
            usuario: {
              select: {
                id: true,
                name: true,
                email: true,
                telefone: true,
              },
            },
          },
        },
      },
    });

    return {
      message: 'Solicitação de conexão enviada com sucesso!',
      data: novaConexao,
    };
  }

  async listarSolicitacoesRecebidas(usuarioId: number) {
    const profissional = await this.prisma.profissional.findUnique({
      where: { usuario_id: usuarioId },
    });

    if (!profissional) {
      throw new BadRequestException('Perfil profissional não encontrado.');
    }

    const solicitacoes = await this.prisma.conexaoProfissional.findMany({
      where: {
        profissional_destino_id: profissional.id,
        status: StatusConexao.PENDENTE,
      },
      include: {
        profissionalOrigem: {
          include: {
            usuario: {
              select: {
                id: true,
                name: true,
                email: true,
                telefone: true,
              },
            },
          },
        },
      },
      orderBy: {
        data_solicitacao: 'desc',
      },
    });

    return {
      message: 'Solicitações recebidas listadas com sucesso!',
      data: solicitacoes,
    };
  }

  async listarSolicitacoesEnviadas(usuarioId: number) {
    const profissional = await this.prisma.profissional.findUnique({
      where: { usuario_id: usuarioId },
    });

    if (!profissional) {
      throw new BadRequestException('Perfil profissional não encontrado.');
    }

    const solicitacoes = await this.prisma.conexaoProfissional.findMany({
      where: {
        profissional_origem_id: profissional.id,
        status: StatusConexao.PENDENTE,
      },
      include: {
        profissionalDestino: {
          include: {
            usuario: {
              select: {
                id: true,
                name: true,
                email: true,
                telefone: true,
              },
            },
          },
        },
      },
      orderBy: {
        data_solicitacao: 'desc',
      },
    });

    return {
      message: 'Solicitações enviadas listadas com sucesso!',
      data: solicitacoes,
    };
  }

  async listarConexoes(usuarioId: number) {
    const profissional = await this.prisma.profissional.findUnique({
      where: { usuario_id: usuarioId },
    });

    if (!profissional) {
      throw new BadRequestException('Perfil profissional não encontrado.');
    }

    const conexoes = await this.prisma.conexaoProfissional.findMany({
      where: {
        OR: [
          {
            profissional_origem_id: profissional.id,
            status: StatusConexao.ACEITO,
          },
          {
            profissional_destino_id: profissional.id,
            status: StatusConexao.ACEITO,
          },
        ],
      },
      include: {
        profissionalOrigem: {
          include: {
            usuario: {
              select: {
                id: true,
                name: true,
                email: true,
                telefone: true,
              },
            },
          },
        },
        profissionalDestino: {
          include: {
            usuario: {
              select: {
                id: true,
                name: true,
                email: true,
                telefone: true,
              },
            },
          },
        },
      },
      orderBy: {
        data_aceite: 'desc',
      },
    });

    return {
      message: 'Conexões listadas com sucesso!',
      data: conexoes,
    };
  }

  async responderSolicitacao(usuarioId: number, conexaoId: number, updateConexaoDto: UpdateConexaoDto) {
    const profissional = await this.prisma.profissional.findUnique({
      where: { usuario_id: usuarioId },
    });

    if (!profissional) {
      throw new BadRequestException('Perfil profissional não encontrado.');
    }

    // Buscar a conexão
    const conexao = await this.prisma.conexaoProfissional.findUnique({
      where: { id: conexaoId },
    });

    if (!conexao) {
      throw new BadRequestException('Solicitação não encontrada.');
    }

    // Verificar se o usuário é o destinatário da solicitação
    if (conexao.profissional_destino_id !== profissional.id) {
      throw new ForbiddenException('Você não tem permissão para responder esta solicitação.');
    }

    // Verificar se a solicitação ainda está pendente
    if (conexao.status !== StatusConexao.PENDENTE) {
      throw new BadRequestException('Esta solicitação já foi respondida.');
    }

    // Atualizar o status da conexão
    const novoStatus = updateConexaoDto.acao === AcaoConexao.ACEITAR 
      ? StatusConexao.ACEITO 
      : StatusConexao.RECUSADO;

    const updateData: any = {
      status: novoStatus,
    };

    if (updateConexaoDto.acao === AcaoConexao.ACEITAR) {
      updateData.data_aceite = new Date();
    }

    const conexaoAtualizada = await this.prisma.conexaoProfissional.update({
      where: { id: conexaoId },
      data: updateData,
      include: {
        profissionalOrigem: {
          include: {
            usuario: {
              select: {
                id: true,
                name: true,
                email: true,
                telefone: true,
              },
            },
          },
        },
        profissionalDestino: {
          include: {
            usuario: {
              select: {
                id: true,
                name: true,
                email: true,
                telefone: true,
              },
            },
          },
        },
      },
    });

    const mensagem = updateConexaoDto.acao === AcaoConexao.ACEITAR 
      ? 'Solicitação aceita com sucesso!' 
      : 'Solicitação recusada com sucesso!';

    return {
      message: mensagem,
      data: conexaoAtualizada,
    };
  }

  async removerConexao(usuarioId: number, conexaoId: number) {
    const profissional = await this.prisma.profissional.findUnique({
      where: { usuario_id: usuarioId },
    });

    if (!profissional) {
      throw new BadRequestException('Perfil profissional não encontrado.');
    }

    // Buscar a conexão
    const conexao = await this.prisma.conexaoProfissional.findUnique({
      where: { id: conexaoId },
    });

    if (!conexao) {
      throw new BadRequestException('Conexão não encontrada.');
    }

    // Verificar se o usuário é parte da conexão
    if (conexao.profissional_origem_id !== profissional.id && 
        conexao.profissional_destino_id !== profissional.id) {
      throw new ForbiddenException('Você não tem permissão para remover esta conexão.');
    }

    // Remover a conexão
    await this.prisma.conexaoProfissional.delete({
      where: { id: conexaoId },
    });

    return {
      message: 'Conexão removida com sucesso!',
    };
  }
}
