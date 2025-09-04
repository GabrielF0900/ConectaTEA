import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCriancaDto } from './dto/create-crianca.dto';

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
          nomeCompleto: fullName,
          idade: calculatedAge,
          dataDeNascimento: birthDateObj,
          genero: gender,
          diagnostico: diagnosis,
          parentesco,
          observacoes: notes || "",
          responsavelId: responsavel.id,
          profissionalId: userId, // ID do profissional logado
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
          profissional: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return {
        message: "Criança cadastrada com sucesso!",
        crianca: {
          id: novaCrianca.id,
          nomeCompleto: novaCrianca.nomeCompleto,
          idade: novaCrianca.idade,
          dataDeNascimento: novaCrianca.dataDeNascimento,
          genero: novaCrianca.genero,
          diagnostico: novaCrianca.diagnostico,
          parentesco: novaCrianca.parentesco,
          observacoes: novaCrianca.observacoes,
          responsavel: novaCrianca.responsavel,
          profissional: novaCrianca.profissional,
          criadoEm: novaCrianca.createdAt,
        },
      };
    } catch (error) {
      console.error("Erro ao cadastrar criança:", error);
      throw new BadRequestException('Erro ao cadastrar criança no banco de dados.');
    }
  }

  async findAll(userId?: number) {
    const whereClause = userId ? { profissionalId: userId } : {};

    return await this.prisma.crianca.findMany({
      where: whereClause,
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
        profissional: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number, userId?: number) {
    const whereClause: any = { id };
    if (userId) whereClause.profissionalId = userId;

    return await this.prisma.crianca.findFirst({
      where: whereClause,
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
        profissional: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async remove(id: number, userId?: number) {
    const whereClause: any = { id };
    if (userId) whereClause.profissionalId = userId;

    // Verificar se a criança existe e pertence ao profissional
    const crianca = await this.prisma.crianca.findFirst({
      where: whereClause,
    });

    if (!crianca) {
      throw new BadRequestException('Criança não encontrada ou não autorizada.');
    }

    return await this.prisma.crianca.delete({
      where: { id },
    });
  }
}
