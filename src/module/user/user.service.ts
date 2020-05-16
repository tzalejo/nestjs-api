import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
  ){}
  
  async get(userId: number): Promise<User>{
    if(!userId) {
      throw new BadRequestException('Es necesario el usuario');
    }
    const user: User = await this._userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException('Usuario no existe');
    }
    return user;
  }

  async getAll(): Promise<User[]>{
    const users: User[] = await this._userRepository.find();
    if (!users) {
      throw new NotFoundException('Usuario no existe');
    }
    return users;
  }
  async update(userId: number, user: User): Promise<User> {
    if(!userId) {
      throw new BadRequestException('Es necesario el usuario');
    }
    const userExiste: User = await this._userRepository.findOne(userId);
    if (!userExiste) {
      throw new NotFoundException('El usuario no existe');
    }

    // actualizo
    userExiste.name = user.name;
    userExiste.apellido = user.apellido;
    userExiste.email = user.email;
    // guardo
    const userUpdate = await this._userRepository.save(userExiste);
    return userUpdate;
  }

  async delete(userId: number):Promise<void>{
    if(!userId) {
      throw new BadRequestException('Es necesario el usuario');
    }
    await this._userRepository.delete(userId);
  }

} 
