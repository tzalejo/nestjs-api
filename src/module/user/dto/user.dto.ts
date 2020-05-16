// dto es una clase pero con la excepcion que va a contner la informacion 
// que nosotros necesitamos transmitir, osea, podemos indicar que campos transmitir y que no
// por ejemplo el password de user no queremos enviar
import { IsNotEmpty, IsString} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  id: number;

  @IsString()
  name: string;

  @IsString()
  apellido: string;

  @IsString()
  email: string;
}