import { Module } from '@nestjs/common';
import { FormularioService } from './formulario.service';
import { FormularioController } from './formulario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormularioRepository } from './formulario.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([FormularioRepository]),AuthModule],
  providers: [FormularioService],
  controllers: [FormularioController]
})
export class FormularioModule {}
