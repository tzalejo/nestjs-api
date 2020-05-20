import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ProveedorRepository } from './proveedor.repository';
import { Proveedor } from './proveedor.entity';
import { LeerProveedorDto, CrearProveedorDto, ModificarProveedorDto } from './dtos';
import { plainToClass } from 'class-transformer';
@Injectable()
export class ProveedorService {
  constructor(
    private readonly _proveedorRepository: ProveedorRepository,
  ) {}

  async get(proveedorId): Promise<LeerProveedorDto>{
    // verifico el proveeid q exista
    if (!proveedorId) throw new BadRequestException('Es necesario el proveedor');
    // busco el proveedor
    const proveedor: Proveedor = await this._proveedorRepository.findOne(proveedorId);
    // devuelvo exceptcion de qu no existe prove
    if (!proveedor) throw new NotFoundException('El proveedor no existe');
    return plainToClass(LeerProveedorDto, proveedor);
  }

  async getAll(): Promise<LeerProveedorDto[]>{
    const proveedores: Proveedor[] = await this._proveedorRepository.find({ order: { 'id':'ASC' } });
    if(!proveedores) throw new NotFoundException('Proveedor no existe');
    return proveedores.map((proveedor: Proveedor) => plainToClass(LeerProveedorDto, proveedor));
  }
  async crear(proveedor: Partial<CrearProveedorDto>): Promise<LeerProveedorDto>{
    if(!proveedor) throw new BadRequestException('Es necesario los datos del proveedor');
    proveedor.nombre = proveedor.nombre.toLowerCase().replace(/\b[a-z]/g, letter => letter.toUpperCase());
    proveedor.apellido = proveedor.apellido.toLowerCase().replace(/\b[a-z]/g, letter => letter.toUpperCase());
    const proveedorNuevo: Proveedor = await this._proveedorRepository.save(proveedor);
    return plainToClass(LeerProveedorDto, proveedorNuevo);
  }

  async update(proveedorId: number, proveedor: Partial<ModificarProveedorDto>): Promise<LeerProveedorDto>{
    if(!proveedorId) throw new BadRequestException('Es necesario el proveedor');
    const proveeExiste: Proveedor = await this._proveedorRepository.findOne(proveedorId);
    if(!proveeExiste) throw new NotFoundException('El proveedor no existe');
    // actualizo
    proveeExiste.DNI = proveedor.DNI;
    proveeExiste.nombre = proveedor.nombre.toLowerCase().replace(/\b[a-z]/g, letter => letter.toUpperCase());
    proveeExiste.apellido = proveedor.apellido.toLowerCase().replace(/\b[a-z]/g, letter => letter.toUpperCase());
    proveeExiste.telefono = proveedor.telefono;
    proveeExiste.email = proveedor.email;
    // guardo
    const userUpdate: Proveedor = await this._proveedorRepository.save(proveeExiste);
    return plainToClass(LeerProveedorDto, userUpdate);
  }

  async delete(proveeId: number): Promise<void> {
    // veo si viene vacio el elemento a eliminar
    if(!proveeId) throw new BadRequestException('Es necesario el proveedor');
    // busco el proveedor
    const provee = await this._proveedorRepository.findOne(proveeId);
    // veo si el proveedor tiene formularios.
    if(!provee.formularios) throw new NotFoundException('El proveedor tiene formularios');
    // elimino proveedor
    await this._proveedorRepository.delete(proveeId);
  }
  
}
