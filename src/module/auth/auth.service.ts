import { Injectable, ConflictException, NotFoundException, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcryptjs';
import * as nodemailer from 'nodemailer';
import * as generate from 'generate-password';
import { AuthRepository } from './auth.repository';
import { SignupDto, SigninDto } from './dto';
import { IJwtPayload } from './jwt-payload.interface';
import { ConfigService } from './../../config/config.service';
import { Configuration } from './../../config/config.keys';
import { User } from '../user/user.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly _authRespository: AuthRepository,
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService,
  ) { }

  // para registrar nuestro usuario
  async signup(signupDto: SignupDto): Promise<void> {
    const { email } = signupDto;
    // valido email
    if (!this.isValidEmail(email)) throw new NotFoundException(`El usuario no existe con este correo ${email}`);
    const userExiste = await this._authRespository.findOne({ email: email });
    // Si existe el usuario, devuelvo error
    if (userExiste) throw new ConflictException('El usuario con el Email ya esta registrado.');
    // hago el registro en el repository
    return this._authRespository.signup(signupDto);
  }
  // Para loguearse
  async signin(signinDto: SigninDto): Promise<{}> {
    const { email, password } = signinDto;
    // valido si es un email
    if (!this.isValidEmail(email)) throw new NotFoundException(`El usuario no existe con este correo ${email}`);
    const user = await this._authRespository.findOne({ email: email });
    if (!user) {
      throw new NotFoundException('El usuario no existe');
    }
    // compara los password
    const isMatch = await compare(password, user.password);

    if (!isMatch) throw new UnauthorizedException('Invalido las credenciales');

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

  async enviarCorreoRegistracion(emailUser: string, pass: string, titulo = 'Registracion'): Promise<boolean> {
    const model = await this._authRespository.findOne({ email: emailUser });
    if (model) {
      const transporter = nodemailer.createTransport({
        host: this._configService.get(Configuration.MAIL_HOST),
        port: parseInt(this._configService.get(Configuration.MAIL_PORT)),
        secure: false, // true para 456, false para otros ps
        auth: {
          user: this._configService.get(Configuration.MAIL_USUARIO),
          pass: this._configService.get(Configuration.MAIL_PASSWORD),
        },
        tls: {
          rejectUnauthorized: false
        }
      });
      const mailOpciones = {
        from: `${titulo} <${this._configService.get(Configuration.MAIL_USUARIO)}>`,
        to: emailUser, // list of receivers (separated by ,)
        subject: `${titulo} de Usuario`,
        text: 'Verificacion',
        html: `
        Hola! <br><br> Gracias por utlizar Sistema <br><br>
        User: ${emailUser} <br>
        Password: ${pass} <br>
        Gracias!
        `
        // '<a href='+ Configuration.host.url + ':' + config.host.port +'/auth/email/verify/'+ model.emailToken + '>Click here to activate your account</a>'  // html body
      };


      const enviado = await new Promise<boolean>(async function (resolve, reject) {
        return await transporter.sendMail(mailOpciones, async (error, info) => {
          if (error) {
            console.log(`Mensaje envio: ${error}`);
            transporter.verify((err, success) => {
              if (err) {
                console.log(err);
              }
            });
            return reject(false);
          }
          // console.log(`Mensaje envio: ${info.messageId}`);
          resolve(true);
        });
      });
      return enviado;
    } else {
      throw new HttpException('Registro no se pudo realizar', HttpStatus.FORBIDDEN);
    }
  }

  // verifico que es una email
  isValidEmail(email: string) {
    if (email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    } else return false
  }
  
  // reseteo password y la envio por correo.
  async resetPassworUser(email: string) {
    if (!this.isValidEmail(email)) throw new ConflictException('El mail no es valido.');
    const usuarioReset: User = await this._authRespository.findOne({ email: email});
    if (!usuarioReset) throw new NotFoundException(`El usuario no existe con este correo ${email}`);
    // Gernero password de 10 digitos..
    const password = generate.generate({
      length: 10,
      numbers: true
    });
    // genera un nro d 10 caracteres
    const salt = await genSalt(10); 
    // generamos el hast con el nro salt generado..
    const passwrodHash = await hash(password, salt);
    // almaceno nueva pass hasheado 
    usuarioReset.password = passwrodHash;
    const usuarioModificado = await this._authRespository.save(usuarioReset);
    // envio email con el nuevo pass
    if (!usuarioModificado) throw new NotFoundException('Se produjo un error al generar el password');
    const enviado = await this.enviarCorreoRegistracion(email, password, 'Reset Password');
    if (enviado) return {messaje: 'Fue enviado a su correo el nuevo password'};
  }
}
