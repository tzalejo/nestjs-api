import { Controller, Get, ParseIntPipe, Param, Patch, Body, Post, Delete, UseGuards } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { LeerClienteDto, CrearClienteDto, ModificarClienteDto } from './dtos';
import { AuthGuard } from '@nestjs/passport';

@Controller('cliente')
export class ClienteController {
  constructor(
    private readonly _clienteService: ClienteService,
  ){}

  @UseGuards(AuthGuard())
  @Get(':clienteId')
  get(
    @Param('clienteId', ParseIntPipe) clienteId: number 
  ): Promise<LeerClienteDto> {
    return this._clienteService.get(clienteId);
  }
  
  @UseGuards(AuthGuard())
  @Get()
  getAll(): Promise<LeerClienteDto[]> {
    return this._clienteService.getAll();
  }

  @UseGuards(AuthGuard())
  @Post()
  creearCliente(
    @Body() cliente: Partial<CrearClienteDto>
  ): Promise<LeerClienteDto> {
    return this._clienteService.crear(cliente);
  }

  @UseGuards(AuthGuard())
  @Patch(':clienteId')
  updatecliente(
    @Param('clienteId', ParseIntPipe) clienteId: number,
    @Body() cliente: Partial<ModificarClienteDto>
  ): Promise<LeerClienteDto>{
    return this._clienteService.update(clienteId, cliente);
  }
  
  @UseGuards(AuthGuard())
  @Delete(':clienteId')
  deleteCliente(
    @Param('clienteId', ParseIntPipe) clienteId: number,
  ){
    return this._clienteService.delete(clienteId);
  }
}
