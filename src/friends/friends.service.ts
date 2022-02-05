import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Friends from './friends.entity';
import User from '../users/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friends)
    private friendsRepository: Repository<Friends>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private userService: UsersService,
  ) {}

  async getFriendsList(userId: number) {
    const user = await this.friendsRepository.findOne({ userId });
    if (user) {
      return await this.userService.getUserNamesById(user.friendsId);
    } else {
      throw new HttpException(
        'User does not have any friends',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async addFriendByEmail(email: string, userId: number) {
    const isUserInFriendDB = await this.friendsRepository.findOne({ userId });
    const friendId = await this.usersRepository.findOne({ email });
    //check if user with given email exist
    if (friendId) {
      //check if  user does have friends list already
      if (isUserInFriendDB) {
        //check if new friend isn't already on the friends list
        if (isUserInFriendDB.friendsId.includes(friendId.id)) {
          throw new HttpException(
            'User is already on the friend list',
            HttpStatus.BAD_REQUEST,
          );
        } else {
          isUserInFriendDB.friendsId.push(friendId.id);
          await this.friendsRepository.update(
            isUserInFriendDB.id,
            isUserInFriendDB,
          );
          return this.userService.getUserNamesById(isUserInFriendDB.friendsId);
        }
      } else {
        const friendIdArray = [friendId.id];
        await this.friendsRepository.save({
          friendsId: friendIdArray,
          userId: userId,
        });
        return this.userService.getUserNamesById([friendId.id]);
      }
    } else {
      throw new HttpException(
        'User with given email does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
