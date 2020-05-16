import { UnauthorizedException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';

import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from './../../../config/config.service';
import { Configuration } from './../../../config/config.keys';
import { AuthRepository } from '../auth.repository';
import { IJwtPayload } from '../jwt-payload.interface';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _configService: ConfigService,
    @InjectRepository(AuthRepository) // Los repositorio cuando son inyectados tiene q tener decorador InjectRepository
    private readonly _authRepository: AuthRepository
  ) {
    super({
      // Le indicamos de donde va a venir nuestro token..
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // con esto le estamos pasando key al constructor de passportstrategy
      secretOrKey: _configService.get(Configuration.JWT_SECRET)
    });
  }

  // se va a encargar de validar si el usuario existe..
  async validateUser(paylaod: IJwtPayload){
    const { email } = paylaod;
    // utilizamos repositorio autenticacion para buscar el usuario q corresponda con ese email
    const user = await this._authRepository.findOne({ where: {email} });
    // no exite el usuario
    if(!user) {
      throw new UnauthorizedException();
    }
    // si existe el usuario retornamos el payload
    return paylaod;
  }
}