import { Controller, Get, Param, Body, Post, Patch, Delete, ParseIntPipe, UseGuards  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users') // Ruta: api/users/
export class UserController {
  constructor(
    private readonly _userService: UserService,
  ){}

  // ParseIntPipe es para parsear el valor que viene como un objeto= {id:'1'}
  // este comportamiento es normal de nodejs, si se quiere parsear los params a un tipo
  // number se debe crear un middleware. En nest esto se resuelve con un pipe: ParseIntPipe
  @Get(':userId')
  // @Roles(RoleType​​.ADMINSTRATOR, 'AUTHOR')
  // @UseGuards(AuthGuard())
  getUser(@Param('userId', ParseIntPipe) userId: number): Promise<User> {
    return this._userService.get(userId);
  }

  @Get()
  @UseGuards(AuthGuard())
  getUsers(): Promise<User[]>{
    return this._userService.getAll();
  }

  @Patch(':userId')
  updateUser(
    @Param('userID', ParseIntPipe) userId: number,
    @Body() user: User,
  ){
    return this._userService.update(userId, user);
  }

  @Delete(':userId')
  deleteUser(@Param('userId', ParseIntPipe) userId: number ){
    return this._userService.delete(userId);
  }
  
}
