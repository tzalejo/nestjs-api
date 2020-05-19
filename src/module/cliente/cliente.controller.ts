import { Controller, Get, ParseIntPipe, Param, Patch, Body, Post, Delete } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { LeerClienteDto, CrearClienteDto, ModificarClienteDto } from './dtos';

@Controller('cliente')
export class ClienteController {
  constructor(
    private readonly _clienteService: ClienteService,
  ){}
  
  @Get(':clienteId')
  get(
    @Param('clienteId', ParseIntPipe) clienteId: number 
  ): Promise<LeerClienteDto> {
    return this._clienteService.get(clienteId);
  }

  @Get()
  getAll(): Promise<LeerClienteDto[]> {
    return this._clienteService.getAll();
  }

  @Post()
  creearCliente(
    @Body() cliente: Partial<CrearClienteDto>
  ): Promise<LeerClienteDto> {
    return this._clienteService.crear(cliente);
  }

  @Patch(':clienteId')
  updatecliente(
    @Param('clienteId', ParseIntPipe) clienteId: number,
    @Body() cliente: Partial<ModificarClienteDto>
  ): Promise<LeerClienteDto>{
    return this._clienteService.update(clienteId, cliente);
  }

  @Delete(':clienteId')
  deleteCliente(
    @Param('clienteId', ParseIntPipe) clienteId: number,
  ){
    return this._clienteService.delete(clienteId);
  }
}
