import { IsOptional, IsString, IsDateString, IsIn } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCriancaDto {
  @ApiPropertyOptional({ description: 'Nome completo da criança' })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiPropertyOptional({ description: 'Data de nascimento da criança' })
  @IsOptional()
  @IsDateString()
  dataNascimento?: string;

  @ApiPropertyOptional({ description: 'Gênero da criança' })
  @IsOptional()
  @IsIn(['Masculino', 'Feminino', 'Outro'])
  genero?: string;

  @ApiPropertyOptional({ description: 'Diagnóstico da criança' })
  @IsOptional()
  @IsString()
  diagnostico?: string;

  @ApiPropertyOptional({ description: 'Observações sobre a criança' })
  @IsOptional()
  @IsString()
  observacoes?: string;

  @ApiPropertyOptional({ description: 'Parentesco com a criança' })
  @IsOptional()
  @IsString()
  parentesco?: string;

  // Dados do responsável
  @ApiPropertyOptional({ description: 'Nome do responsável' })
  @IsOptional()
  @IsString()
  nomeResponsavel?: string;

  @ApiPropertyOptional({ description: 'Telefone do responsável' })
  @IsOptional()
  @IsString()
  telefoneResponsavel?: string;

  @ApiPropertyOptional({ description: 'Email do responsável' })
  @IsOptional()
  @IsString()
  emailResponsavel?: string;

  @ApiPropertyOptional({ description: 'Endereço do responsável' })
  @IsOptional()
  @IsString()
  enderecoResponsavel?: string;
}
