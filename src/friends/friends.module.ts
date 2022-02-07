import { Module } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import Friends from './friends.entity';

@Module({
  imports: [UsersModule, FriendsModule, TypeOrmModule.forFeature([Friends])],
  controllers: [FriendsController],
  providers: [FriendsService],
  exports: [FriendsService, TypeOrmModule.forFeature([Friends]), FriendsModule],
})
export class FriendsModule {}
