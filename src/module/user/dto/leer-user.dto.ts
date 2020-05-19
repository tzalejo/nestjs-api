import { IsNumber, IsString, MaxLength, IsEmail } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer'
import { Formulario } from './../../formulario/formulario.entity';

@Exclude()
export class LeerUserDto {
  @Expose()
  @IsNumber()
  readonly id: number;
  
  @Expose()
  @IsString()
  @MaxLength(60, {message: 'El tamaño del Nombre no es valido'})
  readonly name: string;
  
  @Expose()
  @IsString()
  @MaxLength(60, {message: 'El tamaño del Apellido no es valido'})
  readonly apellido: string;

  @Expose()
  @IsEmail()
  @MaxLength(150, {message: 'El tamaño del Email no es valido'})
  readonly email: string;

  @Expose()
  @Type(() => Formulario)
  readonly formularios: Formulario[]
}