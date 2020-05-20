import { Controller, Get, Body, Post, Patch, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { BuscarFormularioDto, CrearFormularioDto, LeerFormularioDto, ModificarFormularioDto } from './dtos';
import { FormularioService } from './formulario.service';
@Controller('formulario')
export class FormularioController {
  constructor(
    private readonly _formularioService: FormularioService
  ) {}
  
  @Get()
  buscarFormulario(
    @Body() buscarFormularioDto: BuscarFormularioDto
  ): Promise<LeerFormularioDto[]>{
    console.log('buscarFormularioDto', buscarFormularioDto);
    return this._formularioService.getBuscarFormulario(buscarFormularioDto);
  }

  @Post()
  crearFormulario(@Body() formulario: CrearFormularioDto): Promise<LeerFormularioDto>{
    return this._formularioService.crear(formulario);
  }

  @Patch(':formularioId')
  modificarFormulario(
    @Param('formularioId', ParseIntPipe) formularioId: number,
    @Body() formulario: Partial<ModificarFormularioDto>
  ): Promise<LeerFormularioDto>{
    return this._formularioService.update(formularioId, formulario);
  }

  @Delete(':formularioId')
  deleteFormulario(@Param('formularioId', ParseIntPipe) formularioId: number): Promise<void>{
    return this._formularioService.delete(formularioId);
  }
}
