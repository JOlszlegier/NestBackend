import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

import { AuthenticationModule } from './authentication/authentication.module';
import { FriendsService } from './friends/friends.service';
import { FriendsController } from './friends/friends.controller';
import { FriendsModule } from './friends/friends.module';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    AuthenticationModule,
    FriendsModule,
  ],
  controllers: [AppController, FriendsController],
  providers: [AppService, FriendsService],
})
export class AppModule {}
