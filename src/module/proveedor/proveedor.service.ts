import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ProveedorRepository } from './proveedor.repository';
import { Proveedor } from './proveedor.entity';
@Injectable()
export class ProveedorService {
  constructor(
    private readonly _proveedorRepository: ProveedorRepository,
  ) {}

  async get(proveedorId): Promise<Proveedor>{
    // verifico el proveeid q exista
    if (!proveedorId) throw new BadRequestException('Es necesario el proveedor');
    // busco el proveedor
    const proveedor = await this._proveedorRepository.findOne(proveedorId);
    // devuelvo exceptcion de qu no existe prove
    if (!proveedor) throw new NotFoundException('El proveedor no existe');
    return proveedor;
  }

  async getAll(): Promise<Proveedor[]>{
    const proveedores = await this._proveedorRepository.find();
    if(!proveedores) throw new NotFoundException('Proveedor no existe');
    return proveedores;
  }
  async crear(proveedor: Proveedor): Promise<Proveedor>{
    if(!proveedor) throw new BadRequestException('Es necesario los datos del proveedor');
    const proveedorNuevo = await this._proveedorRepository.save(proveedor);
    return proveedorNuevo;
  }

  async update(proveedorId: number, proveedor: Proveedor): Promise<Proveedor>{
    if(!proveedorId) throw new BadRequestException('Es necesario el proveedor');
    const proveeExiste = await this._proveedorRepository.findOne(proveedorId);
    if(!proveeExiste) throw new NotFoundException('El proveedor no existe');
    // actualizo
    proveeExiste.DNI = proveedor.DNI;
    proveeExiste.nombre = proveedor.nombre;
    proveeExiste.apellido = proveedor.apellido;
    proveeExiste.telefono = proveedor.telefono;
    proveeExiste.email = proveedor.email;
    // guardo
    const userUpdate = await this._proveedorRepository.save(proveeExiste);
    return userUpdate;
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
