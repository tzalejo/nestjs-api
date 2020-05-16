import { IsNotEmpty, IsString } from "class-validator";
/**
 * Usuaremos este dto q solo para almacenar las propiedades
 * que necesita para registrar un usuario 
 */

export class SignupDto {

  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsString()
  apellido: string;
  
  @IsNotEmpty()
  @IsString()
  email: string;
  
  @IsNotEmpty()
  @IsString()
  password: string;
}