import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ClienteRepository } from './cliente.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './cliente.entity';
import { LeerClienteDto, CrearClienteDto, ModificarClienteDto } from './dtos';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(ClienteRepository)
    private readonly _clienteRepository: ClienteRepository,
  ){}

  async get(clienteId: number): Promise<LeerClienteDto>{
    if(!clienteId) throw new BadRequestException('El cliente es necesario');
    const cliente = await this._clienteRepository.findOne(clienteId);
    if(!cliente) throw new NotFoundException('No existe el cliente');
    // castiamos la entidad cliente a la clase LeerClienteDto
    return plainToClass(LeerClienteDto, cliente);
  }

  async getAll(): Promise<LeerClienteDto[]> {
    const clientes = await (await this._clienteRepository.find()).sort();
    if(!clientes) throw new NotFoundException('No existen clientes');

    // Devolvemos todo los elemento 
    return clientes.map((cliente: Cliente) => plainToClass(LeerClienteDto, cliente));
  }

  // el parcial indicamos que los campos pueden ser los q estan en el dto.
  async crear(cliente: Partial<CrearClienteDto>): Promise<LeerClienteDto> {
    if(!cliente) throw new BadRequestException('El cliente es necesario');
    const clienteNuevo = await this._clienteRepository.save(cliente);
    return plainToClass(LeerClienteDto, clienteNuevo);
  }

  async update(clienteId: number, cliente: Partial<ModificarClienteDto>): Promise<LeerClienteDto> {
    if(!clienteId) throw new BadRequestException('El cliente es necesario');
    const clienteUpdate: Cliente = await this._clienteRepository.findOne(clienteId);
    if(!clienteUpdate) throw new NotFoundException('No existe el cliente');
    // actualizo
    clienteUpdate.DNI = cliente.DNI;
    clienteUpdate.nombre = cliente.nombre;
    clienteUpdate.apellido = cliente.apellido;
    clienteUpdate.telefono = cliente.telefono;
    clienteUpdate.email = cliente.email;
    // guardo y retorno..
    const clienteModificado = await this._clienteRepository.save(clienteUpdate);
    return plainToClass(LeerClienteDto ,clienteModificado);
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
