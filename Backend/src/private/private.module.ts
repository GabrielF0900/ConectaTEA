import { Module } from '@nestjs/common';
import { PrivateController } from './private.controller';
import { UsersModule } from '../users/users.module';
import { ProfissionaisModule } from '../profissionais/profissionais.module';

@Module({
  imports: [UsersModule, ProfissionaisModule],
  controllers: [PrivateController],
})
export class PrivateModule {}
