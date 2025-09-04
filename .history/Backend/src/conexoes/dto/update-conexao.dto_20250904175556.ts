import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum AcaoConexao {
  ACEITAR = 'ACEITAR',
  RECUSAR = 'RECUSAR'
}

export class UpdateConexaoDto {
  @ApiProperty({ description: 'Ação a ser realizada', enum: AcaoConexao })
  @IsEnum(AcaoConexao)
  acao: AcaoConexao;
}
