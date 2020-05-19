import { Controller, Get, Param, ParseIntPipe, Post, Body, Patch, Delete } from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { Proveedor } from './proveedor.entity';

@Controller('proveedor')
export class ProveedorController {
  constructor(
    private readonly _proveedorService: ProveedorService,
  ){}

  @Get(':proveedorId')
  getProveedor(
    @Param('proveedorId', ParseIntPipe) proveedorId: number
  ): Promise<Proveedor>{
    return this._proveedorService.get(proveedorId);
  }

  @Get()
  getProveedores(): Promise<Proveedor[]>{
    return this._proveedorService.getAll();
  }
  
  @Post()
  crearProveedor(
    @Body() proveedor: Proveedor
  ): Promise<Proveedor>{
    return this._proveedorService.crear(proveedor);
  }

  @Patch(':proveedorId')
  updateProveedor(
    @Param('proveedorId', ParseIntPipe) proveedorId: number,
    @Body() proveedor: Proveedor
  ): Promise<Proveedor>{
    return this._proveedorService.update(proveedorId, proveedor);
  }

  @Delete(':proveedorId')
  deleteProveedor(
    @Param('proveedorId', ParseIntPipe) proveedorId: number
  ){
    return this._proveedorService.delete(proveedorId);
  }
}
