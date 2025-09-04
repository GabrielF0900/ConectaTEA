import { Controller, Get, Put, Query, Param, Body, UseGuards, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { ProfissionaisService } from '../profissionais/profissionais.service';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Rotas Privadas (Legado)')
@Controller('private')
export class PrivateController {
  constructor(
    private readonly usersService: UsersService,
    private readonly profissionaisService: ProfissionaisService,
  ) {}

  @ApiOperation({ summary: 'Listar profissionais (rota legada)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profissionais')
  async listarProfissionais(@Query('usuarioId') usuarioId?: string) {
    // Se usuarioId foi fornecido, buscar apenas esse profissional
    if (usuarioId) {
      const userId = parseInt(usuarioId);
      if (isNaN(userId)) {
        throw new BadRequestException('usuarioId deve ser um número válido.');
      }
      const profissional = await this.profissionaisService.findByUserId(userId);
      return [profissional];
    }

    // Caso contrário, listar todos
    return await this.profissionaisService.findAll();
  }

  @ApiOperation({ summary: 'Atualizar perfil do usuário (rota legada)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('atualizar-perfil/:id')
  async atualizarPerfil(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const userId = parseInt(id);
    if (isNaN(userId)) {
      throw new BadRequestException('ID deve ser um número válido.');
    }
    return await this.usersService.update(userId, updateUserDto);
  }
}
