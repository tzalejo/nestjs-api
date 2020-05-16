import { Module } from '@nestjs/common';
import { FormularioService } from './formulario.service';
import { FormularioController } from './formulario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormularioRepository } from './formulario.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FormularioRepository])],
  providers: [FormularioService],
  controllers: [FormularioController]
})
export class FormularioModule {}
