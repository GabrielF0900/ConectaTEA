import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCriancaDto } from './dto/create-crianca.dto';
import { UpdateCriancaDto } from './dto/update-crianca.dto';

@Injectable()
export class CriancasService {
  constructor(private prisma: PrismaService) {}

  async create(createCriancaDto: CreateCriancaDto, userId?: number) {
    const { fullName, birthDate, gender, diagnosis, parentesco, notes, responsible } = createCriancaDto;
    const { name, phone, email, address } = responsible;

    console.log("=== CADASTRO DE CRIANÇA ===");

    // Processar data de nascimento
    let birthDateObj: Date;
    try {
      if (birthDate.includes('/')) {
        const [day, month, year] = birthDate.split('/');
        birthDateObj = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
      } else {
        birthDateObj = new Date(birthDate);
      }

      if (isNaN(birthDateObj.getTime())) {
        throw new Error('Data inválida');
      }
    } catch (error) {
      throw new BadRequestException('Data de nascimento inválida. Use o formato dd/mm/aaaa.');
    }

    // Calcular idade
    const now = new Date();
    let calculatedAge = now.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = now.getMonth() - birthDateObj.getMonth();
    const dayDiff = now.getDate() - birthDateObj.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      calculatedAge--;
    }

    // Validações
    if (birthDateObj > now) {
      throw new BadRequestException('Data de nascimento não pode ser futura.');
    }

    if (calculatedAge < 0 || calculatedAge > 18) {
      throw new BadRequestException('Idade deve estar entre 0 e 18 anos para cadastro.');
    }

    // Validar telefone
    const phoneFormats = [
      /^\(\d{2}\)\s?\d{4,5}-?\d{4}$/,
      /^\d{2}\s?\d{4,5}-?\d{4}$/,
      /^\d{10,11}$/
    ];

    const isValidPhone = phoneFormats.some(regex => regex.test(phone));
    if (!isValidPhone) {
      throw new BadRequestException('Telefone deve estar em um dos formatos: (71) 99720-9361, 71 99720-9361, ou 71997209361.');
    }

    try {
      // Criar responsável
      const userData: any = {
        name,
        telefone: phone,
        password: "senha-temporaria",
        tipo: "RESPONSAVEL",
      };
      if (email) userData.email = email;
      if (address) userData.endereco = address;

      const responsavel = await this.prisma.user.create({
        data: userData,
      });

      // Criar criança
      const novaCrianca = await this.prisma.crianca.create({
        data: {
          nome: fullName,
          data_nascimento: birthDateObj,
          genero: gender,
          diagnostico: diagnosis,
          diagnosticoDetalhes: '',
          parentesco,
          observacoes: notes || "",
          responsavel_id: responsavel.id,
        },
        include: {
          responsavel: {
            select: {
              id: true,
              name: true,
              email: true,
              telefone: true,
              endereco: true,
            },
          },
        },
      });

      return {
        message: "Criança cadastrada com sucesso!",
        crianca: {
          id: novaCrianca.id,
          nome: novaCrianca.nome,
          idade: calculatedAge,
          dataDeNascimento: novaCrianca.data_nascimento,
          genero: novaCrianca.genero,
          diagnostico: novaCrianca.diagnostico,
          parentesco: novaCrianca.parentesco,
          observacoes: novaCrianca.observacoes,
          responsavel: novaCrianca.responsavel,
        },
      };
    } catch (error) {
      console.error("Erro ao cadastrar criança:", error);
      throw new BadRequestException('Erro ao cadastrar criança no banco de dados.');
    }
  }

  async findAll() {
    const criancasRaw = await this.prisma.crianca.findMany({
      include: {
        responsavel: {
          select: {
            id: true,
            name: true,
            email: true,
            telefone: true,
            endereco: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });

    // Mapear dados para o formato esperado pelo frontend
    const criancas = criancasRaw.map(crianca => ({
      id: crianca.id,
      nome: crianca.nome,
      idade: Math.floor((new Date().getTime() - new Date(crianca.data_nascimento).getTime()) / (1000 * 60 * 60 * 24 * 365)),
      dataNascimento: crianca.data_nascimento.toISOString().split('T')[0], // YYYY-MM-DD
      genero: crianca.genero,
      diagnostico: crianca.diagnostico,
      parentesco: crianca.parentesco,
      observacoes: crianca.observacoes,
      responsavel: {
        id: crianca.responsavel.id,
        nome: crianca.responsavel.name, // Mapear name para nome
        email: crianca.responsavel.email,
        telefone: crianca.responsavel.telefone,
        endereco: crianca.responsavel.endereco,
      },
    }));

    return {
      message: "Crianças listadas com sucesso!",
      criancas,
      total: criancas.length,
    };
  }

  async findOne(id: number) {
    const crianca = await this.prisma.crianca.findFirst({
      where: { id },
      include: {
        responsavel: {
          select: {
            id: true,
            name: true,
            email: true,
            telefone: true,
            endereco: true,
          },
        },
      },
    });

    if (!crianca) {
      throw new BadRequestException('Criança não encontrada.');
    }

    // Calcular idade
    const hoje = new Date();
    const nascimento = new Date(crianca.data_nascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();
    
    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    // Retornar no formato esperado pelo frontend
    return {
      message: "Criança encontrada com sucesso!",
      data: {
        id: crianca.id,
        nome: crianca.nome,
        idade,
        dataNascimento: crianca.data_nascimento.toISOString().split('T')[0],
        genero: crianca.genero,
        diagnostico: crianca.diagnostico,
        observacoes: crianca.observacoes,
        parentesco: crianca.parentesco,
        responsavel: {
          id: crianca.responsavel.id,
          nome: crianca.responsavel.name, // Mapear name para nome
          email: crianca.responsavel.email,
          telefone: crianca.responsavel.telefone,
          endereco: crianca.responsavel.endereco,
        },
      },
    };
  }

  async update(id: number, updateCriancaDto: UpdateCriancaDto) {
    // Verificar se a criança existe
    const criancaExistente = await this.prisma.crianca.findFirst({
      where: { id },
      include: {
        responsavel: {
          select: {
            id: true,
            name: true,
            email: true,
            telefone: true,
            endereco: true,
          },
        },
      },
    });

    if (!criancaExistente) {
      throw new BadRequestException('Criança não encontrada.');
    }

    try {
      // Atualizar dados da criança
      const dadosAtualizarCrianca: any = {};
      
      if (updateCriancaDto.nome) dadosAtualizarCrianca.nome = updateCriancaDto.nome;
      if (updateCriancaDto.dataNascimento) {
        dadosAtualizarCrianca.data_nascimento = new Date(updateCriancaDto.dataNascimento);
      }
      if (updateCriancaDto.genero) dadosAtualizarCrianca.genero = updateCriancaDto.genero;
      if (updateCriancaDto.diagnostico) dadosAtualizarCrianca.diagnostico = updateCriancaDto.diagnostico;
      if (updateCriancaDto.observacoes) dadosAtualizarCrianca.observacoes = updateCriancaDto.observacoes;
      if (updateCriancaDto.parentesco) dadosAtualizarCrianca.parentesco = updateCriancaDto.parentesco;

      // Atualizar dados do responsável se fornecidos
      const dadosAtualizarResponsavel: any = {};
      if (updateCriancaDto.nomeResponsavel) dadosAtualizarResponsavel.name = updateCriancaDto.nomeResponsavel;
      if (updateCriancaDto.telefoneResponsavel) dadosAtualizarResponsavel.telefone = updateCriancaDto.telefoneResponsavel;
      if (updateCriancaDto.emailResponsavel) dadosAtualizarResponsavel.email = updateCriancaDto.emailResponsavel;
      if (updateCriancaDto.enderecoResponsavel) dadosAtualizarResponsavel.endereco = updateCriancaDto.enderecoResponsavel;

      // Atualizar responsável se há dados para atualizar
      if (Object.keys(dadosAtualizarResponsavel).length > 0) {
        await this.prisma.user.update({
          where: { id: criancaExistente.responsavel_id },
          data: dadosAtualizarResponsavel,
        });
      }

      // Atualizar criança
      const criancaAtualizada = await this.prisma.crianca.update({
        where: { id },
        data: dadosAtualizarCrianca,
        include: {
          responsavel: {
            select: {
              id: true,
              name: true,
              email: true,
              telefone: true,
              endereco: true,
            },
          },
        },
      });

      // Calcular idade
      const hoje = new Date();
      const nascimento = new Date(criancaAtualizada.data_nascimento);
      let idade = hoje.getFullYear() - nascimento.getFullYear();
      const mesAtual = hoje.getMonth();
      const mesNascimento = nascimento.getMonth();
      
      if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
        idade--;
      }

      // Retornar no formato esperado pelo frontend
      return {
        message: "Criança atualizada com sucesso!",
        crianca: {
          id: criancaAtualizada.id,
          nome: criancaAtualizada.nome,
          idade,
          dataNascimento: criancaAtualizada.data_nascimento.toISOString().split('T')[0],
          genero: criancaAtualizada.genero,
          diagnostico: criancaAtualizada.diagnostico,
          observacoes: criancaAtualizada.observacoes,
          parentesco: criancaAtualizada.parentesco,
          responsavel: {
            id: criancaAtualizada.responsavel.id,
            nome: criancaAtualizada.responsavel.name, // Mapear name para nome
            email: criancaAtualizada.responsavel.email,
            telefone: criancaAtualizada.responsavel.telefone,
            endereco: criancaAtualizada.responsavel.endereco,
          },
        },
      };
    } catch (error) {
      console.error('Erro ao atualizar criança:', error);
      throw new BadRequestException('Erro ao atualizar criança.');
    }
  }

  async remove(id: number) {
    // Verificar se a criança existe
    const crianca = await this.prisma.crianca.findFirst({
      where: { id },
    });

    if (!crianca) {
      throw new BadRequestException('Criança não encontrada.');
    }

    await this.prisma.crianca.delete({
      where: { id },
    });

    return {
      message: "Criança removida com sucesso!",
    };
  }
}
