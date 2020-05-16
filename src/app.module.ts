import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './module/user/user.module';

import { Configuration } from "./config/config.keys";
import { AppService } from './app.service';
import { ConfigService } from "./config/config.service";

import { AppController } from './app.controller';
import { AuthModule } from './module/auth/auth.module';
import { ClienteModule } from './module/cliente/cliente.module';
import { ProveedorModule } from './module/proveedor/proveedor.module';
import { FormularioModule } from './module/formulario/formulario.module';

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule, AuthModule, ClienteModule, ProveedorModule, FormularioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
