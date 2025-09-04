import { Module } from '@nestjs/common';
import { CriancasService } from './criancas.service';
import { CriancasController } from './criancas.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CriancasController],
  providers: [CriancasService],
  exports: [CriancasService],
})
export class CriancasModule {}
