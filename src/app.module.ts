import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './module/user/user.module';

import { Configuration } from "./config/config.keys";
import { AppService } from './app.service';
import { ConfigService } from "./config/config.service";

import { AppController } from './app.controller';
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
