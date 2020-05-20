import { IsNumber, IsString, IsDate } from "class-validator";
import { Cliente } from "./../../cliente/cliente.entity";
import { User } from "./../../user/user.entity";

export class BuscarFormularioDto {  
  @IsString()
  readonly compra_moneda: string;
  
  @IsNumber()
  readonly cliente: Cliente;

  @IsNumber()
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