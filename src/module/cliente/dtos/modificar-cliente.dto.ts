import { IsNumber, IsString, MaxLength, IsEmail } from 'class-validator';
export class ModificarClienteDto {

  @IsNumber()
  readonly DNI: number;

  @IsString()
  @MaxLength(60)
  readonly nombre: string;

  @IsString()
  @MaxLength(60, {message: 'El tamaño del Apellido no es valido'})
  readonly apellido: string;
  
  @IsString()
  @MaxLength(60, {message: 'El tamaño del Telefono no es valido'})
  readonly telefono: string;

  @IsEmail()
  @MaxLength(150, {message: 'El tamaño del Email no es valido'})
  readonly email: string;

}