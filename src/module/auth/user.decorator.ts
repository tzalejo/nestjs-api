import { createParamDecorator } from "@nestjs/common";
import { UserDto } from "../user/dto/user.dto";
// nos ayuda a extraer la info de nuestro usuario una vez q se haga un request
export const GetUser = createParamDecorator((data, req): UserDto => {
  return req.user;
}); 