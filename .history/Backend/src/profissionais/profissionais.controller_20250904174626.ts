import { Controller, Get, Query, UseGuards, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ProfissionaisService } from './profissionais.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Profissionais')
@Controller('profissionais')
export class ProfissionaisController {
  constructor(private readonly profissionaisService: ProfissionaisService) {}

  @ApiOperation({ summary: 'Listar todos os profissionais' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query('usuarioId') usuarioId?: string) {
    // Se usuarioId foi fornecido, buscar apenas esse profissional
    if (usuarioId) {
      const userId = parseInt(usuarioId);
      if (isNaN(userId)) {
        throw new BadRequestException('usuarioId deve ser um número válido.');
      }
      const profissional = await this.profissionaisService.findByUserId(userId);
      // Retorna array vazio se não encontrou, para manter compatibilidade
      return profissional ? [profissional] : [];
    }

    // Caso contrário, listar todos
    return await this.profissionaisService.findAll();
  }
}
