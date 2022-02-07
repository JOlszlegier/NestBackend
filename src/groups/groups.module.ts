import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Groups from './groups.entity';
import { UsersModule } from '../users/users.module';
import { FriendsModule } from '../friends/friends.module';
import { GroupsService } from './groups.service';

@Module({
  imports: [UsersModule, FriendsModule, TypeOrmModule.forFeature([Groups])],
  controllers: [GroupsController],
  providers: [GroupsService],
  exports: [GroupsService, GroupsModule, TypeOrmModule.forFeature([Groups])],
})
export class GroupsModule {}
