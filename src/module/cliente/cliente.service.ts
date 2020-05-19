import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ClienteRepository } from './cliente.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './cliente.entity';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(ClienteRepository)
    private readonly _clienteRepository: ClienteRepository,
  ){}

  async get(clienteId: number): Promise<Cliente>{
    if(!clienteId) throw new BadRequestException('El cliente es necesario');
    const cliente = await this._clienteRepository.findOne(clienteId);
    if(!cliente) throw new NotFoundException('No existe el cliente');
    return cliente;
  }

  async getAll(): Promise<Cliente[]> {
    const clientes = await (await this._clienteRepository.find()).sort();
    if(!clientes) throw new NotFoundException('No existen clientes');
    return clientes;
  }

  async crear(cliente: Cliente): Promise<Cliente> {
    if(!cliente) throw new BadRequestException('El cliente es necesario');
    const clienteNuevo = await this._clienteRepository.save(cliente);
    return clienteNuevo;
  }

  async update(clienteId: number, cliente: Cliente): Promise<Cliente> {
    if(!clienteId) throw new BadRequestException('El cliente es necesario');
    const clienteUpdate = await this._clienteRepository.findOne(clienteId);
    if(!clienteUpdate) throw new NotFoundException('No existe el cliente');
    // actualizo
    clienteUpdate.DNI = cliente.DNI;
    clienteUpdate.nombre = cliente.nombre;
    clienteUpdate.apellido = cliente.apellido;
    clienteUpdate.telefono = cliente.telefono;
    clienteUpdate.email = cliente.email;
    // guardo y retorno..
    return await this._clienteRepository.save(clienteUpdate);
  }

  async delete(clienteId: number): Promise<void>{
    if(!clienteId) throw new BadRequestException('Es necesario el cliente');
    // busco el cliente
    const clienteDelete = await this._clienteRepository.findOne(clienteId);
    // veo si el cliente tiene formularios.
    if(!clienteDelete.formularios) throw new NotFoundException('El cliente tiene formularios');
    // elimino cliente si no tiene formulario
    await this._clienteRepository.delete(clienteId);
  }

}
