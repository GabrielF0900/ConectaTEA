//Algoritmo que cuidará do envio de solicitações de amizade entre profissionais.

import { Request, Response } from "express";
import prisma from "../../lib/prisma";

export async function EnvioDeSolicitacoes(req: Request, res: Response) {
  console.log("[EnvioDeSolicitacoes] body recebido:", req.body);
  // Aceita tanto ids de usuário (solicitanteId/solicitadoId) quanto ids de profissional
  // (solicitanteProfId/solicitadoProfId). Preferência para ids de profissional quando fornecidos.
  let { solicitanteId, solicitadoId, solicitanteProfId, solicitadoProfId } =
    req.body;

  // Normalizar valores numéricos
  solicitanteId =
    solicitanteId !== undefined ? Number(solicitanteId) : undefined;
  solicitadoId = solicitadoId !== undefined ? Number(solicitadoId) : undefined;
  solicitanteProfId =
    solicitanteProfId !== undefined ? Number(solicitanteProfId) : undefined;
  solicitadoProfId =
    solicitadoProfId !== undefined ? Number(solicitadoProfId) : undefined;

  try {
    // Se não foram fornecidos ids de profissional, então os ids de usuário são obrigatórios
    // e devem ser inteiros. Caso contrário, aceitaremos apenas os ids de profissional.
    if (solicitanteProfId === undefined && solicitadoProfId === undefined) {
      if (!Number.isInteger(solicitanteId) || !Number.isInteger(solicitadoId)) {
        return res
          .status(400)
          .json({ error: "IDs de usuários inválidos. Devem ser inteiros." });
      }
    }

    // Variáveis que conterão os registros de profissional (quando resolvidos)
    let solicitanteProf: any = undefined;
    let solicitadoProf: any = undefined;

    // Se foi passado id de profissional, tentar localizar (com fallback para usuario_id)
    if (solicitanteProfId !== undefined) {
      solicitanteProf = await prisma.profissional.findUnique({
        where: { id: solicitanteProfId },
      });
      if (!solicitanteProf) {
        // Talvez o frontend tenha passado um userId por engano — tentar por usuario_id
        solicitanteProf = await prisma.profissional.findUnique({
          where: { usuario_id: solicitanteProfId },
        });
      }
      if (!solicitanteProf) {
        console.warn(
          "[EnvioDeSolicitacoes] solicitanteProf não encontrado para id:",
          solicitanteProfId
        );
        return res
          .status(404)
          .json({
            error:
              "Profissional solicitante não encontrado (id fornecido não corresponde a profissional nem a usuário).",
            provided: { solicitanteProfId },
          });
      }
    }

    if (solicitadoProfId !== undefined) {
      solicitadoProf = await prisma.profissional.findUnique({
        where: { id: solicitadoProfId },
      });
      if (!solicitadoProf) {
        solicitadoProf = await prisma.profissional.findUnique({
          where: { usuario_id: solicitadoProfId },
        });
      }
      if (!solicitadoProf) {
        console.warn(
          "[EnvioDeSolicitacoes] solicitadoProf não encontrado para id:",
          solicitadoProfId
        );
        return res
          .status(404)
          .json({
            error:
              "Profissional solicitado não encontrado (id fornecido não corresponde a profissional nem a usuário).",
            provided: { solicitadoProfId },
          });
      }
    }

    // Se ainda não resolvemos um lado via profissional.id, mapear via user ids
    if (!solicitanteProf) {
      if (!Number.isInteger(solicitanteId)) {
        return res.status(400).json({ error: "ID do usuário solicitante inválido." });
      }

      const solicitanteUser = await prisma.user.findUnique({ where: { id: solicitanteId } });
      console.log("[EnvioDeSolicitacoes] solicitanteUser lookup result:", solicitanteUser);
      if (!solicitanteUser) return res.status(404).json({ error: "Usuário solicitante não encontrado." });

      solicitanteProf = await prisma.profissional.findUnique({ where: { usuario_id: solicitanteId } });
      console.log("[EnvioDeSolicitacoes] solicitanteProf lookup result:", solicitanteProf);

      // Se o usuário é do tipo PROFISSIONAL e não existe registro em Profissional, criar um mínimo
      if (!solicitanteProf && solicitanteUser.tipo === 'PROFISSIONAL') {
        try {
          console.log('[EnvioDeSolicitacoes] criando registro Profissional mínimo para usuário:', solicitanteId);
          solicitanteProf = await prisma.profissional.create({
            data: {
              usuario_id: solicitanteId,
              especialidade: 'Não informado',
              registro_profissional: 'N/A'
            }
          });
          console.log('[EnvioDeSolicitacoes] profissional criado:', solicitanteProf);
        } catch (e: any) {
          // Se outro processo criou simultaneamente, tentar buscar novamente
          console.warn('[EnvioDeSolicitacoes] erro ao criar profissional (talvez já exista), re-consultando:', e?.message ?? e);
          solicitanteProf = await prisma.profissional.findUnique({ where: { usuario_id: solicitanteId } });
          console.log('[EnvioDeSolicitacoes] solicitanteProf re-lookup result:', solicitanteProf);
        }
      }
    }

    if (!solicitadoProf) {
      if (!Number.isInteger(solicitadoId)) {
        return res.status(400).json({ error: "ID do usuário solicitado inválido." });
      }

      const solicitadoUser = await prisma.user.findUnique({ where: { id: solicitadoId } });
      console.log("[EnvioDeSolicitacoes] solicitadoUser lookup result:", solicitadoUser);
      if (!solicitadoUser) return res.status(404).json({ error: "Usuário solicitado não encontrado." });

      solicitadoProf = await prisma.profissional.findUnique({ where: { usuario_id: solicitadoId } });
      console.log("[EnvioDeSolicitacoes] solicitadoProf lookup result:", solicitadoProf);

      if (!solicitadoProf && solicitadoUser.tipo === 'PROFISSIONAL') {
        try {
          console.log('[EnvioDeSolicitacoes] criando registro Profissional mínimo para usuário:', solicitadoId);
          solicitadoProf = await prisma.profissional.create({
            data: {
              usuario_id: solicitadoId,
              especialidade: 'Não informado',
              registro_profissional: 'N/A'
            }
          });
          console.log('[EnvioDeSolicitacoes] profissional criado:', solicitadoProf);
        } catch (e: any) {
          console.warn('[EnvioDeSolicitacoes] erro ao criar profissional (talvez já exista), re-consultando:', e?.message ?? e);
          solicitadoProf = await prisma.profissional.findUnique({ where: { usuario_id: solicitadoId } });
          console.log('[EnvioDeSolicitacoes] solicitadoProf re-lookup result:', solicitadoProf);
        }
      }
    }

    if (!solicitanteProf || !solicitadoProf) {
      const missing: string[] = [];
      if (!solicitanteProf) missing.push("solicitante");
      if (!solicitadoProf) missing.push("solicitado");
      console.warn(
        "[EnvioDeSolicitacoes] falha ao resolver profissionais, faltando:",
        missing
      );
      return res
        .status(404)
        .json({
          error: "Profissional associado ao usuário não encontrado.",
          missing,
        });
    }

    // Criando a solicitação de amizade (ConexaoProfissional)
    // Observação: permitimos múltiplas solicitações entre os mesmos profissionais
    const novaSolicitacao = await prisma.conexaoProfissional.create({
      data: {
        solicitante_id: solicitanteProf.id,
        solicitado_id: solicitadoProf.id,
      },
    });

    return res.status(201).json(novaSolicitacao);
  } catch (error) {
    console.error("Erro ao enviar solicitação:", error);
    return res
      .status(500)
      .json({
        error: "Erro interno ao enviar solicitação",
        details: (error as Error).message,
      });
  }
}
