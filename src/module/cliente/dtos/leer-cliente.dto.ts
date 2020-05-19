import { IsNumber, IsString, MaxLength, IsEmail } from 'class-validator';
import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class LeerClienteDto {
  @Expose()
  @IsNumber()
  readonly id: number;
  
  @Expose()
  @IsNumber()
  readonly DNI: number;
  
  @Expose()
  @IsString()
  @MaxLength(60, {message: 'El tamaño del Nombre no es valido'})
  readonly nombre: string;
  
  @Expose()
  @IsString()
  @MaxLength(60, {message: 'El tamaño del Apellido no es valido'})
  readonly apellido: string;
  
  @Expose()
  @IsString()
  @MaxLength(60, {message: 'El tamaño del Telefono no es valido'})
  readonly telefono: string;
  
  @Expose()
  @IsEmail()
  @MaxLength(150, {message: 'El tamaño del Email no es valido'})
  readonly email: string;

}