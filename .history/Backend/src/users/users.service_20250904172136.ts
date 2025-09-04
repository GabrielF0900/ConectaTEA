import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserType } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password, tipo } = createUserDto;

    console.log('=== DEBUG REGISTRO ===');
    console.log('Dados recebidos:', { name, email, password: '***', tipo });

    // Verificar email trimmed
    const emailTrimmed = email.trim();
    
    // Regex para validação de e-mail
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailTrimmed)) {
      throw new ConflictException('Email inválido.');
    }

    // Converter tipo para maiúscula e validar
    const tipoUpperCase = tipo.toUpperCase();
    console.log('Tipo convertido:', tipoUpperCase);
    console.log('UserType values:', Object.values(UserType));
    
    if (!Object.values(UserType).includes(tipoUpperCase as UserType)) {
      console.log('Tipo inválido detectado');
      throw new ConflictException('Tipo de usuário inválido. Use: PROFISSIONAL ou RESPONSAVEL.');
    }

    // Verificar se email já existe
    const emailExistente = await this.prisma.user.findFirst({
      where: { email: emailTrimmed },
    });

    if (emailExistente) {
      throw new ConflictException('Email já registrado.');
    }

    // Criptografar senha
    const senhaCriptografada = await bcrypt.hash(password, 10);

    // Criar usuário
    const novoUsuario = await this.prisma.user.create({
      data: {
        name,
        email: emailTrimmed,
        password: senhaCriptografada,
        tipo: tipoUpperCase,
      },
    });

    return {
      message: 'Usuário registrado com sucesso.',
      user: {
        id: novoUsuario.id,
        name: novoUsuario.name,
        email: novoUsuario.email,
        tipo: novoUsuario.tipo,
      },
    };
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        tipo: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        tipo: true,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
