import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// Módulos da aplicação
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CriancasModule } from './criancas/criancas.module';
import { ProfissionaisModule } from './profissionais/profissionais.module';
import { ConexoesModule } from './conexoes/conexoes.module';
import { MetasModule } from './metas/metas.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'conectatea-secret-key',
      signOptions: { expiresIn: '7d' },
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    CriancasModule,
    ProfissionaisModule,
    ConexoesModule,
    MetasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
