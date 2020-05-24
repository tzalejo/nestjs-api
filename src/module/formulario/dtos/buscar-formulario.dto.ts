import { IsNumber, IsString, IsDate } from "class-validator";
import { Type } from 'class-transformer';
import { Cliente } from "./../../cliente/cliente.entity";
import { User } from "./../../user/user.entity";

export class BuscarFormularioDto {  
  @IsString()
  readonly compra_moneda: string;
  
  @Type(()=> Cliente)
  readonly cliente: Cliente;

  @Type(() => User)
  readonly user: User;

  @IsString()
  readonly estado: string;
  
  @IsDate()
  readonly fechaDesde: Date;
  
  @IsDate()
  readonly fechaHasta: Date;
  
  @IsString()
  readonly tipo_criptomoneda: string;
}