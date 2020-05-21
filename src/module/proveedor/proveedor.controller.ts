import { Controller, Get, Param, ParseIntPipe, Post, Body, Patch, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProveedorService } from './proveedor.service';
import { LeerProveedorDto, ModificarProveedorDto, CrearProveedorDto } from './dtos';

@Controller('proveedor')
export class ProveedorController {
  constructor(
    private readonly _proveedorService: ProveedorService,
  ){}

  @UseGuards(AuthGuard())
  @Get(':proveedorId')
  getProveedor(
    @Param('proveedorId', ParseIntPipe) proveedorId: number
  ): Promise<LeerProveedorDto>{
    return this._proveedorService.get(proveedorId);
  }

  @UseGuards(AuthGuard())
  @Get()
  getProveedores(): Promise<LeerProveedorDto[]>{
    return this._proveedorService.getAll();
  }
  
  @UseGuards(AuthGuard())
  @Post()
  crearProveedor(
    @Body() proveedor: Partial<CrearProveedorDto>
  ): Promise<LeerProveedorDto>{
    return this._proveedorService.crear(proveedor);
  }

  @UseGuards(AuthGuard())
  @Patch(':proveedorId')
  updateProveedor(
    @Param('proveedorId', ParseIntPipe) proveedorId: number,
    @Body() proveedor: Partial<ModificarProveedorDto>
  ): Promise<LeerProveedorDto>{
    return this._proveedorService.update(proveedorId, proveedor);
  }

  @UseGuards(AuthGuard())
  @Delete(':proveedorId')
  deleteProveedor(
    @Param('proveedorId', ParseIntPipe) proveedorId: number
  ){
    return this._proveedorService.delete(proveedorId);
  }
}
