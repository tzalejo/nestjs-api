import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {cors: true});
  
    app.setGlobalPrefix('api');
    // proteger su aplicación de algunas vulnerabilidades web bien conocidas configurando los encabezados HTTP 
    app.use(helmet());
    app.enableCors();
    app.use(rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message:
        'Demasiadas solicitudes de esta IP, intente nuevamente más tarde'
    }));
    await app.listen(AppModule.port);
    console.log(`Escuando en el puerto ${AppModule.port}`);
  } catch (error) {
    // devuelvo error
    throw new Error(`Error: ${error}`);
  }
}
bootstrap();
