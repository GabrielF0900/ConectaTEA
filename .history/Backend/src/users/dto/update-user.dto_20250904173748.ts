import { IsString, IsEmail, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: 'Nome do usuário', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiProperty({ description: 'Email do usuário', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Telefone do usuário', required: false })
  @IsOptional()
  @IsString()
  telefone?: string;

  @ApiProperty({ description: 'Endereço do usuário', required: false })
  @IsOptional()
  @IsString()
  endereco?: string;

  @ApiProperty({ description: 'URL da foto de perfil', required: false })
  @IsOptional()
  @IsString()
  fotoPerfilUrl?: string;

  @ApiProperty({ description: 'Biografia do usuário', required: false })
  @IsOptional()
  @IsString()
  biografia?: string;

  @ApiProperty({ description: 'LinkedIn do usuário', required: false })
  @IsOptional()
  @IsString()
  linkedin?: string;

  @ApiProperty({ description: 'Localização do usuário', required: false })
  @IsOptional()
  @IsString()
  localizacao?: string;
}
