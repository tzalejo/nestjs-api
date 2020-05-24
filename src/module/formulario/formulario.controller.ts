import { Controller, Get, Body, Post, Patch, Param, ParseIntPipe, Delete, UseGuards, Query, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BuscarFormularioDto, CrearFormularioDto, LeerFormularioDto, ModificarFormularioDto } from './dtos';
import { FormularioService } from './formulario.service';
@Controller('formulario')
export class FormularioController {
  constructor(
    private readonly _formularioService: FormularioService
  ) {}

  @UseGuards(AuthGuard())
  @Get()
  buscarFormulario(
    @Query() buscarFormularioDto: BuscarFormularioDto
  ): Promise<LeerFormularioDto[]>{
    // console.log('buscarFormularioDto', buscarFormularioDto);
    return this._formularioService.getBuscarFormulario(buscarFormularioDto);
  }
  
  @UseGuards(AuthGuard())
  @Post()
  crearFormulario(@Body() formulario: CrearFormularioDto): Promise<LeerFormularioDto>{
    return this._formularioService.crear(formulario);
  }

  @UseGuards(AuthGuard())
  @Patch(':formularioId')
  modificarFormulario(
    @Param('formularioId', ParseIntPipe) formularioId: number,
    @Body() formulario: Partial<ModificarFormularioDto>
  ): Promise<LeerFormularioDto>{
    return this._formularioService.update(formularioId, formulario);
  }

  @UseGuards(AuthGuard())
  @Delete(':formularioId')
  deleteFormulario(@Param('formularioId', ParseIntPipe) formularioId: number): Promise<void>{
    return this._formularioService.delete(formularioId);
  }
}
