import { IsString, IsNumber, IsOptional, IsEmail, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum Gender {
  MASCULINO = 'Masculino',
  FEMININO = 'Feminino',
  OUTRO = 'Outro',
}

export enum Parentesco {
  PAI = 'PAI',
  MAE = 'MAE',
  AVO = 'AVO',
  AVOA = 'AVOA',
  TIO = 'TIO',
  TIA = 'TIA',
  TUTOR = 'TUTOR',
  OUTRO = 'OUTRO',
}

export class ResponsibleDto {
  @ApiProperty({ example: 'Maria Silva' })
  @IsString()
  name: string;

  @ApiProperty({ example: '(11) 99999-9999' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'maria@email.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'Rua das Flores, 123', required: false })
  @IsOptional()
  @IsString()
  address?: string;
}

export class CreateCriancaDto {
  @ApiProperty({ example: 'João da Silva' })
  @IsString()
  fullName: string;

  @ApiProperty({ example: 5, required: false })
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiProperty({ example: '15/05/2018' })
  @IsString()
  birthDate: string;

  @ApiProperty({ example: 'Masculino', enum: Gender })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({ example: 'TEA Leve' })
  @IsString()
  diagnosis: string;

  @ApiProperty({ example: 'PAI', enum: Parentesco })
  @IsEnum(Parentesco)
  parentesco: Parentesco;

  @ApiProperty({ type: ResponsibleDto })
  @ValidateNested()
  @Type(() => ResponsibleDto)
  responsible: ResponsibleDto;

  @ApiProperty({ example: 'Observações importantes...', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
