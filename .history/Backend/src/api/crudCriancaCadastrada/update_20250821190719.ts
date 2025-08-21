import { Request, Response } from "express";
import prisma from "../../lib/prisma";

export async function UpdateCrianca(req: Request, res: Response) {
    const { id } = req.params; // Identificando a criança pelo id
    const dados = req.body;    // Pegando os dados novos para atualizar

    try {
        // Verificando se a criança existe
        const criancaExistente = await prisma.crianca.findUnique({
            where: { id: Number(id) },
            include: { responsavel: true }
        });

        if (!criancaExistente) {
            return res.status(404).json({ message: "Criança não encontrada." });
        }

        // Extrair dados da criança e do responsável do body
        const { responsavel, ...dadosCrianca } = dados;

        // Preparar dados para atualização da criança
        const dadosCriancaAtualizada = {
            nome: dadosCrianca.nome,
            data_nascimento: new Date(dadosCrianca.dataNascimento),
            genero: dadosCrianca.genero,
            diagnostico: dadosCrianca.diagnostico,
            observacoes: dadosCrianca.observacoes,
            parentesco: dadosCrianca.parentesco
        };

        // Atualizar dados do responsável se fornecidos
        if (responsavel) {
            // Verificar se os dados do responsável são diferentes
            const responsavelAtual = criancaExistente.responsavel;
            const dadosDiferentes = 
                responsavelAtual.name !== responsavel.nome ||
                responsavelAtual.telefone !== responsavel.telefone ||
                responsavelAtual.email !== responsavel.email ||
                responsavelAtual.endereco !== responsavel.endereco;

            if (dadosDiferentes) {
                console.log("🔄 Dados do responsável alterados, verificando se precisa criar novo...");
                
                // Verificar se existe outro responsável com esses dados exatos
                const responsavelExistente = await prisma.user.findFirst({
                    where: {
                        AND: [
                            { name: responsavel.nome },
                            { telefone: responsavel.telefone },
                            ...(responsavel.email ? [{ email: responsavel.email }] : [{ email: null }]),
                            { tipo: "RESPONSAVEL" }
                        ]
                    }
                });

                if (responsavelExistente) {
                    // Usar responsável existente
                    console.log("✅ Responsável com dados idênticos encontrado, reutilizando...");
                    dadosCriancaAtualizada.responsavel_id = responsavelExistente.id;
                } else {
                    // Criar novo responsável
                    console.log("📝 Criando novo responsável com os dados alterados...");
                    const novoResponsavel = await prisma.user.create({
                        data: {
                            name: responsavel.nome,
                            telefone: responsavel.telefone,
                            email: responsavel.email || null,
                            endereco: responsavel.endereco || null,
                            password: "senha-temporaria",
                            tipo: "RESPONSAVEL"
                        }
                    });
                    dadosCriancaAtualizada.responsavel_id = novoResponsavel.id;
                    console.log("✅ Novo responsável criado:", novoResponsavel.id);
                }
            }
        }

        // Atualizando a criança
        const criancaAtualizada = await prisma.crianca.update({
            where: { id: Number(id) },
            data: dadosCriancaAtualizada,
            include: {
                responsavel: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        telefone: true,
                        endereco: true
                    }
                }
            }
        });

        return res.status(200).json({ 
            message: "Criança atualizada com sucesso!",
            crianca: criancaAtualizada 
        });
    } catch (error) {
        console.error('Erro ao atualizar criança:', error);
        return res.status(500).json({ message: "Erro ao atualizar criança." });
    }
}
