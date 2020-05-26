import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { LeerUserDto, ModificarUserDto } from './dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
  ){}
  
  async get(userId: number): Promise<LeerUserDto>{
    // verifico el id q envia
    if(!userId) throw new BadRequestException('Es necesario el usuario');
    const user: User = await this._userRepository.findOne(userId);
    // verifico si hay usuario
    if (!user) throw new NotFoundException('Usuario no existe');
    // retorno user casteado 
    return plainToClass(LeerUserDto, user) ;
  }

  async getAll(): Promise<LeerUserDto[]>{
    const users: User[] = await this._userRepository.find({ order: {'id':'ASC'} });
    // verfico si hay usuarios
    if (!users) throw new NotFoundException('Usuario no existe');
    return users.map((user: User) => plainToClass(LeerUserDto, user));
  }
  async update(userId: number, user: Partial<ModificarUserDto>): Promise<LeerUserDto> {
    if(!userId) throw new BadRequestException('Es necesario el usuario');
    const userExiste: User = await this._userRepository.findOne({ id: userId });
    if (!userExiste) throw new NotFoundException('El usuario no existe');
    // actualizo
    userExiste.name = user.name;
    userExiste.apellido = user.apellido;
    userExiste.email = user.email;
    // guardo
    const userUpdate = await this._userRepository.save(userExiste);
    return plainToClass(LeerUserDto, userUpdate);
  }

  async delete(userId: number):Promise<void>{
    if(!userId) throw new BadRequestException('Es necesario el usuario');
    await this._userRepository.delete(userId);
  }
  
} 
