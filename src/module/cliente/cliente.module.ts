import { Module } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteRepository } from './cliente.repository';

@Module({
  imports:[TypeOrmModule.forFeature([ClienteRepository])],
  controllers: [ClienteController],
  providers: [ClienteService]
})
export class ClienteModule {}
