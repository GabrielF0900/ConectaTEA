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
  console.log("=== CADASTRO DE CRIANÇA ===");
  console.log("Body recebido:", JSON.stringify(req.body, null, 2));
  
  const { fullName, age, birthDate, gender, diagnosis, notes, responsible } =
    req.body as CreateChildDTO;

  console.log("Dados extraídos:", { fullName, age, birthDate, gender, diagnosis, notes, responsible });

  // Verificar se o objeto responsible existe
  if (!responsible) {
    console.log("❌ Erro: Dados do responsável são obrigatórios");
    return res.status(400).json({ 
      message: "Dados do responsável são obrigatórios." 
    });
  }

  const { name, phone, email, address } = responsible;
  console.log("Dados do responsável:", { name, phone, email, address });

  // Validação dos campos obrigatórios
  if (!fullName || !birthDate || !gender || !diagnosis || !name || !phone) {
    console.log("❌ Erro: Campos obrigatórios faltando");
    console.log("Campos recebidos:", { fullName, birthDate, gender, diagnosis, name, phone });
    return res.status(400).json({ 
      message: "Campos obrigatórios: Nome Completo, Data de Nascimento, Gênero, Diagnóstico, Nome do Responsável e Telefone." 
    });
  }

  // Processar data de nascimento (formato dd/mm/aaaa para yyyy-mm-dd)
  let birthDateObj: Date;
  try {
    console.log("📅 Processando data de nascimento:", birthDate);
    // Se a data vier no formato dd/mm/aaaa, converter
    if (birthDate.includes('/')) {
      const [day, month, year] = birthDate.split('/');
      birthDateObj = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
      console.log("✅ Data convertida:", birthDateObj);
    } else {
      // Se já vier no formato yyyy-mm-dd
      birthDateObj = new Date(birthDate);
      console.log("✅ Data direta:", birthDateObj);
    }
    
    if (isNaN(birthDateObj.getTime())) {
      throw new Error('Data inválida');
    }
  } catch (error) {
    console.log("❌ Erro ao processar data:", error);
    return res.status(400).json({ 
      message: "Data de nascimento inválida. Use o formato dd/mm/aaaa." 
    });
  }

  // Calcular idade automaticamente
  const now = new Date();
  let calculatedAge = now.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = now.getMonth() - birthDateObj.getMonth();
  const dayDiff = now.getDate() - birthDateObj.getDate();

  // Ajuste da idade se ainda não fez aniversário este ano
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    calculatedAge--;
  }

  console.log("🎂 Idade calculada:", calculatedAge);

  // Validações
  if (birthDateObj > now) {
    console.log("❌ Data futura detectada");
    return res.status(400).json({ message: "Data de nascimento não pode ser futura." });
  }

  if (calculatedAge < 0 || calculatedAge > 18) {
    console.log("❌ Idade fora do limite:", calculatedAge);
    return res.status(400).json({ message: "Idade deve estar entre 0 e 18 anos para cadastro." });
  }

  // Validar gênero
  const validGenders = ["Masculino", "Feminino", "Outro"];
  if (!validGenders.includes(gender)) {
    console.log("❌ Gênero inválido:", gender);
    return res.status(400).json({ 
      message: "Gênero deve ser: Masculino, Feminino ou Outro." 
    });
  }

  // Validar telefone (formato básico)
  const phoneRegex = /^\(\d{2}\)\s?\d{4,5}-?\d{4}$/;
  if (!phoneRegex.test(phone)) {
    console.log("❌ Telefone inválido:", phone);
    console.log("Formato esperado: (11) 99999-9999");
    return res.status(400).json({ 
      message: "Telefone deve estar no formato (11) 99999-9999." 
    });
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
        idade: calculatedAge, // Incluir a idade calculada
        genero: gender,
        diagnostico: diagnosis,
        observacoes: notes || null,
        responsavel_id: responsavel.id,
      },
    });

    return res.status(201).json({ 
      message: "Criança cadastrada com sucesso!", 
      crianca: {
        id: crianca.id,
        nome: crianca.nome,
        idade: calculatedAge,
        data_nascimento: birthDateObj.toLocaleDateString('pt-BR'),
        genero: crianca.genero,
        diagnostico: crianca.diagnostico,
        observacoes: crianca.observacoes,
        responsavel: {
          id: responsavel.id,
          nome: responsavel.name,
          telefone: responsavel.telefone,
          email: responsavel.email,
          endereco: responsavel.endereco
        }
      }
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Erro ao cadastrar a criança.", error });
  }
}
