import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
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
  ): Promise<void> {
    return await this._authService.signup(signupDto);
  }
  @Post('/signin')
  @UsePipes(ValidationPipe)
  async signin(
    @Body() signinDto: SigninDto
  ){
    return await this._authService.signin(signinDto);
  }
}
