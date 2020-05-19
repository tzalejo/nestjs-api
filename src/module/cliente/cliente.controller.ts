import { Controller, Get, ParseIntPipe, Param, Patch, Body, Post, Delete } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.entity';

@Controller('cliente')
export class ClienteController {
  constructor(
    private readonly _clienteService: ClienteService,
  ){}
  
  @Get(':clienteId')
  get(
    @Param('clienteId', ParseIntPipe) clienteId: number 
  ): Promise<Cliente> {
    return this._clienteService.get(clienteId);
  }

  @Get()
  getAll(): Promise<Cliente[]> {
    return this._clienteService.getAll();
  }

  @Post()
  creearCliente(
    @Body() cliente: Cliente
  ): Promise<Cliente> {
    return this._clienteService.crear(cliente);
  }

  @Patch(':clienteId')
  updatecliente(
    @Param('clienteId', ParseIntPipe) clienteId: number,
    @Body() cliente: Cliente
  ): Promise<Cliente>{
    return this._clienteService.update(clienteId, cliente);
  }

  @Delete(':clienteId')
  deleteCliente(
    @Param('clienteId', ParseIntPipe) clienteId: number,
  ){
    return this._clienteService.delete(clienteId);
  }
}
