import { Controller, Get, Param, Body, Patch, Delete, ParseIntPipe, UseGuards  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { LeerUserDto, ModificarUserDto } from './dto';
@Controller('user') // Ruta: api/users/
export class UserController {
  constructor(
    private readonly _userService: UserService,
  ){}

  // ParseIntPipe es para parsear el valor que viene como un objeto= {id:'1'}
  // este comportamiento es normal de nodejs, si se quiere parsear los params a un tipo
  // number se debe crear un middleware. En nest esto se resuelve con un pipe: ParseIntPipe
  @UseGuards(AuthGuard())
  @Get(':userId')
  // @Roles(RoleType​​.ADMINSTRATOR, 'AUTHOR')
  getUser(@Param('userId', ParseIntPipe) userId: number): Promise<LeerUserDto> {
    return this._userService.get(userId);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get()
  getUsers(): Promise<LeerUserDto[]>{
    return this._userService.getAll();
  }

  @Patch(':userId')
  updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() user: Partial<ModificarUserDto>,
  ): Promise<LeerUserDto>{
    return this._userService.update(userId, user);
  }

  @Delete(':userId')
  deleteUser(@Param('userId', ParseIntPipe) userId: number ): Promise<void>{
    return this._userService.delete(userId);
  }
  
}
