import { IsString, IsOptional, MaxLength, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class LocalAtendimentoDto {
  @ApiProperty({ description: 'Nome do local', required: false })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiProperty({ description: 'Cidade do local', required: false })
  @IsOptional()
  @IsString()
  cidade?: string;
}

class RedeSocialDto {
  @ApiProperty({ description: 'Tipo da rede social', required: false })
  @IsOptional()
  @IsString()
  tipo?: string;

  @ApiProperty({ description: 'URL da rede social', required: false })
  @IsOptional()
  @IsString()
  url?: string;
}

export class UpdateProfissionalDto {
  @ApiProperty({ description: 'Nome do profissional', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nome?: string;

  @ApiProperty({ description: 'Email do profissional', required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ description: 'Telefone do profissional', required: false })
  @IsOptional()
  @IsString()
  telefone?: string;

  @ApiProperty({ description: 'Especialidade do profissional', required: false })
  @IsOptional()
  @IsString()
  especialidade?: string;

  @ApiProperty({ description: 'Registro profissional', required: false })
  @IsOptional()
  @IsString()
  registroProfissional?: string;

  @ApiProperty({ description: 'Título do profissional', required: false })
  @IsOptional()
  @IsString()
  titulo?: string;

  @ApiProperty({ description: 'Formação acadêmica', required: false })
  @IsOptional()
  @IsString()
  formacaoAcademica?: string;

  @ApiProperty({ description: 'Sobre o profissional', required: false })
  @IsOptional()
  @IsString()
  sobre?: string;

  @ApiProperty({ description: 'URL da foto de perfil', required: false })
  @IsOptional()
  @IsString()
  fotoPerfilUrl?: string;

  @ApiProperty({ description: 'Código de identificação', required: false })
  @IsOptional()
  @IsString()
  codigoIdentificacao?: string;

  @ApiProperty({ description: 'Locais de atendimento', required: false, type: [LocalAtendimentoDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LocalAtendimentoDto)
  locaisAtendimento?: LocalAtendimentoDto[];

  @ApiProperty({ description: 'Redes sociais', required: false, type: [RedeSocialDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RedeSocialDto)
  redesSociais?: RedeSocialDto[];
}
