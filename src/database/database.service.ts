// Para las distintas conexiones que necesitemos
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { ConfigModule } from './../config/config.module';
import { ConfigService } from './../config/config.service';
import { Configuration } from './../config/config.keys';

export const databaseProviders = [
  // si queremos una nueva bd solo tenemos q configurar otro modulo
  TypeOrmModule.forRootAsync({
    imports: [ ConfigModule ],
    inject: [ ConfigService],// para q la bd obtenga su credencial
    async useFactory(_config: ConfigService) {//es un metodo que va a crear un objeto d conexion 
      return {
        // ssl: true, // para cuando necesitemos conectar a una bd en la nube
        type: 'postgres' as 'postgres',
        host: _config.get(Configuration.HOST),
        username: _config.get(Configuration.USERNAME),
        password: _config.get(Configuration.PASSWORD),
        port: 5444,
        database: _config.get(Configuration.DATABASE),
        entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
        migrations: [`${__dirname}/migrations/*{.ts,.js}`],
      } as ConnectionOptions // castiamos
    } 
  })
]