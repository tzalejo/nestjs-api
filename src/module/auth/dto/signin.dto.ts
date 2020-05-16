import { IsNotEmpty, IsString } from "class-validator";
/**
 * Usuaremos este dto q solo para almacenar las
 * propiedades que se necesitan para iniciar session
 */
export class SigninDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}