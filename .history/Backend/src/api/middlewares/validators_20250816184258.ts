// Utilitários para validação e helpers dos middlewares
import { Request } from 'express';
import { AuthenticatedRequest } from './authenticated';
import prisma from '../../lib/prisma';

export interface ValidationResult {
  isValid: boolean;
  message?: string;
  error?: string;
}

// Verificar se um responsável tem acesso a uma criança específica
export async function validateResponsavelChildAccess(
  userId: number, 
  childId: number
): Promise<ValidationResult> {
  try {
    const crianca = await prisma.crianca.findFirst({
      where: {
        id: childId,
        responsavel_id: userId
      }
    });

    if (!crianca) {
      return {
        isValid: false,
        message: 'Você não tem permissão para acessar esta criança.',
        error: 'CHILD_ACCESS_DENIED'
      };
    }

    return { isValid: true };

  } catch (error) {
    console.error('Erro ao validar acesso à criança:', error);
    return {
      isValid: false,
      message: 'Erro ao verificar permissões.',
      error: 'VALIDATION_ERROR'
    };
  }
}

// Verificar se um profissional tem acesso a uma criança (via relacionamento)
export async function validateProfissionalChildAccess(
  userId: number, 
  childId: number
): Promise<ValidationResult> {
  try {
    // Verificar se existe relacionamento entre profissional e criança
    const relacao = await prisma.profissionalCriança.findFirst({
      where: {
        crianca_id: childId,
        profissional: {
          user_id: userId
        }
      }
    });

    if (!relacao) {
      return {
        isValid: false,
        message: 'Você não está atribuído a esta criança.',
        error: 'PROFESSIONAL_CHILD_ACCESS_DENIED'
      };
    }

    return { isValid: true };

  } catch (error) {
    console.error('Erro ao validar acesso do profissional à criança:', error);
    return {
      isValid: false,
      message: 'Erro ao verificar permissões.',
      error: 'VALIDATION_ERROR'
    };
  }
}

// Verificar se usuário existe e está ativo
export async function validateUserExists(userId: number): Promise<ValidationResult> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return {
        isValid: false,
        message: 'Usuário não encontrado.',
        error: 'USER_NOT_FOUND'
      };
    }

    return { isValid: true };

  } catch (error) {
    console.error('Erro ao validar usuário:', error);
    return {
      isValid: false,
      message: 'Erro ao verificar usuário.',
      error: 'VALIDATION_ERROR'
    };
  }
}

// Helper para extrair dados do usuário do request
export function getUserFromRequest(req: Request): AuthenticatedRequest['user'] | null {
  return req.user || null;
}

// Helper para verificar se usuário é profissional
export function isProfissional(req: Request): boolean {
  return req.user?.tipo === 'PROFISSIONAL';
}

// Helper para verificar se usuário é responsável
export function isResponsavel(req: Request): boolean {
  return req.user?.tipo === 'RESPONSAVEL';
}

// Validar parâmetros obrigatórios
export function validateRequiredParams(
  params: { [key: string]: any }, 
  required: string[]
): ValidationResult {
  const missing = required.filter(param => !params[param]);
  
  if (missing.length > 0) {
    return {
      isValid: false,
      message: `Parâmetros obrigatórios faltando: ${missing.join(', ')}`,
      error: 'MISSING_REQUIRED_PARAMS'
    };
  }

  return { isValid: true };
}

// Sanitizar dados de entrada
export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>\"']/g, '');
}

// Verificar se ID é um número válido
export function validateId(id: string | number): { isValid: boolean; id?: number } {
  const numId = typeof id === 'string' ? parseInt(id) : id;
  
  if (isNaN(numId) || numId <= 0) {
    return { isValid: false };
  }
  
  return { isValid: true, id: numId };
}
