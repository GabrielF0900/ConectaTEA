import { Module } from '@nestjs/common';
import { ConexoesController } from './conexoes.controller';
import { ConexoesService } from './conexoes.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ConexoesController],
  providers: [ConexoesService],
  exports: [ConexoesService],
})
export class ConexoesModule {}
