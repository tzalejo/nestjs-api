import { IsNumber, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { Cliente } from './../../cliente/cliente.entity';
import { Proveedor } from './../../proveedor/proveedor.entity';

export class ModificarFormularioDto {
  @IsString()
  web: string;
  
  @IsString()
  compra_moneda: string;
  
  @IsNumber()
  comision_prove: number;
  
  @IsNumber()
  comision_vendedor: number;

  @IsNumber()
  valor_comision_prove: number;

  @IsNumber()
  valor_comision_vendedor: number;

  @IsNumber()
  criptomoneda: number;

  @IsString()
  tipo_criptomoneda: string;

  @IsNumber()
  importe_compra: number;
  
  @IsString()
  fecha_compra: string;

  @IsDate()
  fecha: Date;

  @IsNumber()
  dolar: number;

  @IsString()
  estado: string;
  
  @IsNumber()
  costo_criptomoneda_p: number;
  
  @IsNumber()
  costo_criptomoneda_v: number;
  
  @IsNumber()
  ganancia_criptomoneda: number;
  
  @Type(() => Cliente)
  cliente: Cliente;

  @Type(() => Proveedor)
  proveedor: Proveedor;

}