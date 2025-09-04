import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConexaoDto {
  @ApiProperty({ description: 'ID do profissional que vai receber a solicitação' })
  @IsNumber()
  @IsNotEmpty()
  profissionalDestinoId: number;
}
