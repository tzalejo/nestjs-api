import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

import { AuthRepository } from './auth.repository';
import { SignupDto, SigninDto } from './dto';
import { IJwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly _authRespository: AuthRepository,
    private readonly _jwtService: JwtService,
  ){}

  // para registrar nuestro usuario
  async signup(signupDto: SignupDto): Promise<void> {
    const { email } = signupDto;
    const userExiste = await this._authRespository.findOne({
      where: [{ email }],
    });
    // Si existe el usuario, devuelvo error
    if (userExiste) {
      throw new ConflictException('El usuario con el Email ya esta registrado.');
    }
    
    return this._authRespository.signup(signupDto);
  }
  // Para loguearse
  async signin(signinDto: SigninDto): Promise<{}> {
    const { email, password } = signinDto;
    const user = await this._authRespository.findOne({
      where: {email}
    });
    if (!user) {
      throw new NotFoundException('El usuario no existe');
    }
    // compara los password
    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalido las credenciales');
    }

    const payload: IJwtPayload = {
      id: user.id,
      name: user.name,
      apellido: user.apellido,
      email: user.email
    }

    // creamos el token
    const token = await this._jwtService.sign(payload);

    return {
      id: user.id,
      name: payload.name,
      apellido: payload.apellido,
      email: payload.email,
      token
    };
  }
}
