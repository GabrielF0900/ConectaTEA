import { Request, Response } from "express";
import prisma from "../../lib/prisma";

export interface CreateChildDTO {
  fullName: string;
  birthDate: string; // yyyy-mm-dd
  gender: "M" | "F" | "Outro";
  diagnosis: string;
  notes?: string;
  responsible: {
    name: string;
    phone: string;
    email?: string;
    address?: string;
  };
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
  const age = now.getFullYear() - birthDateObj.getFullYear();
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
      responsavel = await prisma.user.create({
        data: {
          name,
          telefone: phone,
          email,
          endereco: address,
          tipo: "RESPONSAVEL",
        },
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
