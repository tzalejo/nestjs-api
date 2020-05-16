import { Module } from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { ProveedorController } from './proveedor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProveedorRepository } from './proveedor.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProveedorRepository])],
  providers: [ProveedorService],
  controllers: [ProveedorController]
})
export class ProveedorModule {}
