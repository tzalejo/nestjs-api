import { Repository, EntityRepository } from "typeorm";
import { User } from "../user/user.entity";
import { SignupDto } from "./dto";
import { genSalt, hash } from "bcryptjs";

@EntityRepository(User)
export class AuthRepository extends Repository<User> {

  // Autenticacion
  async signup(signupDto: SignupDto) {
    const { name, apellido, email, password } = signupDto;
    const user = new User();
    user.name = name;
    user.apellido = apellido;
    user.email = email;
    // generar salt(es un nro q se agrega al hash) para nuestro password
    const salt = await genSalt(10); // genera un nro d 10 caracteres
    // generamos el hast ocn el nro salt generado..
    user.password = await hash(password, salt);
    // guardamos el usuario..
    user.save();
  }
}