import { Controller, Post, Body, UsePipes, ValidationPipe, HttpException, HttpStatus, NotFoundException, Get, Param } from '@nestjs/common';
import { SignupDto, SigninDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService
  ) {}

  @Post('/signup')
  @UsePipes(ValidationPipe) // para que cumpla las condiciones de SignupDto
  async signup(
    @Body() signupDto: SignupDto
  ) {
    try {
      await this._authService.signup(signupDto);
      const emailEnviado = await this._authService.enviarCorreoRegistracion(signupDto.email, signupDto.password);
      if (emailEnviado) {
        return true;
      }
      throw new HttpException('Registro no se pudo realizar', HttpStatus.FORBIDDEN);
    } catch (error) {
      throw new NotFoundException('Error inesperado.', error);
    }
  }

  @Post('/signin')
  @UsePipes(ValidationPipe)
  async signin(
    @Body() signinDto: SigninDto
  ) {
    return await this._authService.signin(signinDto);
  }

  @Get('reset-password/:email')
  async resetPassUser(@Param() params) {
    return this._authService.resetPassworUser(params.email);
  }

}
