import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";

// le indica typeorm q nuestro usuario va a ser una entidad de bd por lo tanto le va proveer d tod lo necesario
@EntityRepository(User) 
export class UserRepository extends Repository<User> {
  
}