import { Request, Response } from "express";
import prisma from "../../lib/prisma";

// Listar crianças do profissional logado
export async function ListarCriancas(req: Request, res: Response) {
  try {
    // O middleware authenticated já adiciona req.user
    const profissionalId = (req as any).user.id;

    // Buscar todas as crianças cadastradas pelo profissional
    const criancas = await prisma.crianca.findMany({
      include: {
        responsavel: {
          select: {
            id: true,
            name: true,
            email: true,
            telefone: true
          }
        }
      },
      orderBy: {
        id: 'desc'
      }
    });

    // Calcular idade para cada criança
    const criancasComIdade = criancas.map(crianca => {
      const birthDate = new Date(crianca.data_nascimento);
      const now = new Date();
      let idade = now.getFullYear() - birthDate.getFullYear();
      const monthDiff = now.getMonth() - birthDate.getMonth();
      const dayDiff = now.getDate() - birthDate.getDate();

      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        idade--;
      }

      return {
        id: crianca.id,
        nome: crianca.nome,
        idade,
        diagnostico: crianca.diagnostico,
        observacoes: crianca.observacoes,
        responsavelId: crianca.responsavel_id,
        responsavel: {
          nome: crianca.responsavel.name,
          email: crianca.responsavel.email || '',
          telefone: crianca.responsavel.telefone
        }
      };
    });

    return res.status(200).json({
      message: "Crianças encontradas com sucesso!",
      criancas: criancasComIdade,
      total: criancasComIdade.length
    });

  } catch (error) {
    console.error('Erro ao listar crianças:', error);
    return res.status(500).json({ 
      message: "Erro interno do servidor ao buscar crianças." 
    });
  }
}

// Cadastrar criança (versão simplificada para frontend)
export async function CadastrarCriancaSimples(req: Request, res: Response) {
  try {
    const { nome, idade, diagnostico, observacoes, responsavelEmail } = req.body;

    // Validações básicas
    if (!nome || !idade || !responsavelEmail) {
      return res.status(400).json({ 
        error: "Nome, idade e email do responsável são obrigatórios." 
      });
    }

    if (idade < 0 || idade > 18) {
      return res.status(400).json({ 
        error: "Idade deve estar entre 0 e 18 anos." 
      });
    }

    // Buscar ou criar responsável pelo email
    let responsavel = await prisma.user.findFirst({
      where: {
        email: responsavelEmail,
        tipo: "RESPONSAVEL",
      },
    });

    if (!responsavel) {
      return res.status(404).json({ 
        error: "Responsável não encontrado com este email. Verifique se o responsável já está cadastrado no sistema." 
      });
    }

    // Calcular data de nascimento aproximada baseada na idade
    const currentYear = new Date().getFullYear();
    const birthYear = currentYear - idade;
    const birthDate = new Date(`${birthYear}-01-01`);

    // Cadastrar criança
    const crianca = await prisma.crianca.create({
      data: {
        nome,
        data_nascimento: birthDate,
        idade: idade, // Adicionar o campo idade obrigatório
        genero: "Outro", // Valor padrão
        diagnostico: diagnostico || "A definir",
        observacoes: observacoes || null,
        responsavel_id: responsavel.id,
      },
      include: {
        responsavel: {
          select: {
            id: true,
            name: true,
            email: true,
            telefone: true
          }
        }
      }
    });

    return res.status(201).json({ 
      message: "Criança cadastrada com sucesso!", 
      crianca: {
        id: crianca.id,
        nome: crianca.nome,
        idade,
        diagnostico: crianca.diagnostico,
        observacoes: crianca.observacoes,
        responsavelId: crianca.responsavel_id,
        responsavel: {
          nome: crianca.responsavel.name,
          email: crianca.responsavel.email,
          telefone: crianca.responsavel.telefone
        }
      }
    });

  } catch (error) {
    console.error('Erro ao cadastrar criança:', error);
    return res.status(500).json({ 
      error: "Erro interno do servidor ao cadastrar criança." 
    });
  }
}
