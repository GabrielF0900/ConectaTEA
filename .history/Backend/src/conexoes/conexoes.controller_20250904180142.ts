import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ConexoesService } from './conexoes.service';
import { CreateConexaoDto } from './dto/create-conexao.dto';
import { UpdateConexaoDto } from './dto/update-conexao.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Conexões')
@Controller('conexoes')
export class ConexoesController {
  constructor(private readonly conexoesService: ConexoesService) {}

  @ApiOperation({ summary: 'Enviar solicitação de conexão' })
  @ApiResponse({ status: 201, description: 'Solicitação enviada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('enviar')
  async enviarSolicitacao(@Body() createConexaoDto: CreateConexaoDto, @Req() req: any) {
    return await this.conexoesService.enviarSolicitacao(req.user?.id, createConexaoDto);
  }

  @ApiOperation({ summary: 'Listar solicitações recebidas' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('recebidas')
  async listarSolicitacoesRecebidas(@Req() req: any) {
    return await this.conexoesService.listarSolicitacoesRecebidas(req.user?.id);
  }

  @ApiOperation({ summary: 'Listar solicitações enviadas' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('enviadas')
  async listarSolicitacoesEnviadas(@Req() req: any) {
    return await this.conexoesService.listarSolicitacoesEnviadas(req.user?.id);
  }

  @ApiOperation({ summary: 'Listar conexões aceitas' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async listarConexoes(@Req() req: any) {
    return await this.conexoesService.listarConexoes(req.user?.id);
  }

  @ApiOperation({ summary: 'Responder solicitação de conexão (aceitar/recusar)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id/responder')
  async responderSolicitacao(
    @Param('id') id: string, 
    @Body() updateConexaoDto: UpdateConexaoDto, 
    @Req() req: any
  ) {
    const conexaoId = parseInt(id);
    if (isNaN(conexaoId)) {
      throw new BadRequestException('ID da conexão deve ser um número válido.');
    }
    return await this.conexoesService.responderSolicitacao(req.user?.id, conexaoId, updateConexaoDto);
  }

  @ApiOperation({ summary: 'Listar conexões de um profissional específico' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profissional/:profissionalId')
  async listarConexoesPorProfissional(@Param('profissionalId') profissionalId: string) {
    const id = parseInt(profissionalId);
    if (isNaN(id)) {
      throw new BadRequestException('ID do profissional deve ser um número válido.');
    }
    return await this.conexoesService.listarConexoesPorProfissional(id);
  }

  @ApiOperation({ summary: 'Filtrar conexões por parâmetros' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('filtrar')
  async filtrarConexoes(
    @Query('solicitanteProfId') solicitanteProfId?: string,
    @Query('solicitadoProfId') solicitadoProfId?: string,
    @Req() req?: any
  ) {
    const params: any = {};
    if (solicitanteProfId) {
      const id = parseInt(solicitanteProfId);
      if (isNaN(id)) {
        throw new BadRequestException('ID do solicitante deve ser um número válido.');
      }
      params.solicitanteProfId = id;
    }
    if (solicitadoProfId) {
      const id = parseInt(solicitadoProfId);
      if (isNaN(id)) {
        throw new BadRequestException('ID do solicitado deve ser um número válido.');
      }
      params.solicitadoProfId = id;
    }
    return await this.conexoesService.filtrarConexoes(params);
  }

  @ApiOperation({ summary: 'Remover/excluir conexão' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removerConexao(@Param('id') id: string, @Req() req: any) {
    const conexaoId = parseInt(id);
    if (isNaN(conexaoId)) {
      throw new BadRequestException('ID da conexão deve ser um número válido.');
    }
    return await this.conexoesService.removerConexao(req.user?.id, conexaoId);
  }
}
