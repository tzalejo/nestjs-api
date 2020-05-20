import { IsNumber, IsString, MaxLength, IsEmail } from 'class-validator';
export class CrearProveedorDto {

  @IsNumber()
  DNI: number;

  @IsString()
  @MaxLength(60, {message: 'El tamaño del Nombre no es valido'})
  nombre: string;

  @IsString()
  @MaxLength(60, {message: 'El tamaño del Apellido no es valido'})
  apellido: string;
  
  @IsString()
  @MaxLength(60, {message: 'El tamaño del Telefono no es valido'})
  telefono: string;

  @IsEmail()
  @MaxLength(150, {message: 'El tamaño del Email no es valido'})
  email: string;

}