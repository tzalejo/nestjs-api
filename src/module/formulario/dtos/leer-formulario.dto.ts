import { IsNumber, IsString, IsDate } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer'
import { Cliente } from './../../cliente/cliente.entity';
import { Proveedor } from './../../proveedor/proveedor.entity';

@Exclude()
export class LeerFormularioDto {

  @Expose()  
  @IsString()
  readonly web: string;
  
  @Expose() // {name: 'compraMoneda'}  
  @IsString()
  readonly compra_moneda: string;
  
  @Expose()
  @IsNumber()
  readonly comision_prove: number;
  
  @Expose()
  @IsNumber()
  readonly comision_vendedor: number;

  @Expose()
  @IsNumber()
  readonly valor_comision_prove: number;

  @Expose()
  @IsNumber()
  readonly valor_comision_vendedor: number;

  @Expose()
  @IsNumber()
  readonly criptomoneda: number;

  @Expose()  
  @IsString()
  readonly tipo_criptomoneda: string;

  @Expose()
  @IsNumber()
  readonly importe_compra: number;
  
  @Expose()  
  @IsString()
  readonly fecha_compra: string;

  @Expose()  
  @IsDate()
  readonly fecha: Date;

  @Expose()
  @IsNumber()
  readonly dolar: number;

  @Expose()  
  @IsString()
  readonly estado: string;
  
  @Expose()
  @IsNumber()
  readonly costo_criptomoneda_p: number;
  
  @Expose()
  @IsNumber()
  readonly costo_criptomoneda_v: number;
  
  @Expose()
  @IsNumber()
  readonly ganancia_criptomoneda: number;
  
  @Expose()
  @Type(() => Cliente)
  readonly cliente: Cliente;

  @Expose()
  @Type(() => Proveedor)
  readonly proveedor: Proveedor;

    // @Expose()
  // @IsNumber()
  // readonly id: number;
  
  // @Expose()
  // @IsNumber()
  // readonly DNI: number;
  
  // @Expose()
  // @IsString()
  // @MaxLength(60, {message: 'El tamaño del Nombre no es valido'})
  // readonly nombre: string;
  
  // @Expose()
  // @IsString()
  // @MaxLength(60, {message: 'El tamaño del Apellido no es valido'})
  // readonly apellido: string;
  
  // @Expose()
  // @IsString()
  // @MaxLength(60, {message: 'El tamaño del Telefono no es valido'})
  // readonly telefono: string;
  
  // @Expose()
  // @IsEmail()
  // @MaxLength(150, {message: 'El tamaño del Email no es valido'})
  // readonly email: string;
  
  

}