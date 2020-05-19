import { IsString, MaxLength, IsEmail } from 'class-validator';
export class ModificarUserDto {

  @IsString()
  @MaxLength(60, {message: 'El tamaño del Nombre no es valido'})
  readonly name: string;

  @IsString()
  @MaxLength(60, {message: 'El tamaño del Apellido no es valido'})
  readonly apellido: string;
  
  @IsEmail()
  @MaxLength(150, {message: 'El tamaño del Email no es valido'})
  readonly email: string;
  
}