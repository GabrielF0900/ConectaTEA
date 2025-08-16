import { Request, Response } from "express";
import prisma from "../../lib/prisma";

export interface CreateChildDTO {
  // Informações Básicas
  fullName: string;        // Nome Completo
  age?: number;           // Idade (calculada automaticamente ou fornecida)
  birthDate: string;      // Data de Nascimento (dd/mm/aaaa)
  gender: "Masculino" | "Feminino" | "Outro";  // Gênero
  diagnosis: string;      // Diagnóstico (dropdown com opções)
  
  // Informações do Responsável
  responsible: {
    name: string;         // Nome do Responsável
    phone: string;        // Telefone (obrigatório)
    email?: string;       // E-mail (opcional)
    address?: string;     // Endereço (opcional)
  };
  
  // Informações Adicionais
  notes?: string;         // Observações (opcional)
}

export async function CadastrarCrianca(req: Request, res: Response) {
  const { fullName, birthDate, gender, diagnosis, notes, responsible } =
    req.body as CreateChildDTO;

  const { name, phone, email, address } = responsible;

  // Validação dos campos obrigatórios
  if (!fullName || !birthDate || !gender || !diagnosis || !name || !phone) {
    return res.status(400).json({ message: "Dados inválidos." });
  }

  // Validação da data de nascimento
  const birthDateObj = new Date(birthDate);
  const now = new Date();
  let age = now.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = now.getMonth() - birthDateObj.getMonth();
  const dayDiff = now.getDate() - birthDateObj.getDate();

  // Ajuste da idade se ainda não fez aniversário este ano
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  if (birthDateObj > now) {
    return res.status(400).json({ message: "Data de nascimento não pode ser futura." });
  }

  if (age < 0 || age > 18) {
    return res.status(400).json({ message: "Idade inválida para cadastro." });
  }

  try {
    // Procurar ou criar responsável
    let responsavel = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { telefone: phone }],
        tipo: "RESPONSAVEL",
      },
    });

    if (!responsavel) {
      const userData: any = {
        name,
        telefone: phone,
        password: "senha-temporaria",
        tipo: "RESPONSAVEL",
      };
      if (email) userData.email = email;
      if (address) userData.endereco = address;
      responsavel = await prisma.user.create({
        data: userData,
      });
    }

    // Cadastrar criança vinculada ao responsável
    const crianca = await prisma.crianca.create({
      data: {
        nome: fullName,
        data_nascimento: birthDateObj,
        genero: gender,
        diagnostico: diagnosis,
        observacoes: notes,
        responsavel_id: responsavel.id,
      },
    });

    return res
      .status(201)
      .json({ message: "Criança cadastrada com sucesso!", crianca });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Erro ao cadastrar a criança.", error });
  }
}
