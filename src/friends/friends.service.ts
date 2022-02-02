import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Friends from './friends.entity';
import User from '../users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friends)
    private friendsRepository: Repository<Friends>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUsersByEmails(emails: [string]) {
    const friendsId: number[] = [];
    for (const email of emails) {
      const user = await this.usersRepository.findOne({ email });
      if (user) {
        friendsId.push(user.id);
      }
    }
  }
}
