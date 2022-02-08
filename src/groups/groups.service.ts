import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Groups from './groups.entity';
import { Repository } from 'typeorm';
import Friends from '../friends/friends.entity';
import User from '../users/user.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Groups)
    private groupsRepository: Repository<Groups>,
    @InjectRepository(Friends)
    private friendsRepository: Repository<Friends>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private userService: UsersService,
  ) {}

  async addGroup(data: CreateGroupDto) {
    const usersIds: number[] = [];
    for (const email of data.usersEmails) {
      const userId = await this.userService.getIdByEmail(email);
      if (userId) {
        usersIds.push(userId);
      }
    }
    const newGroup: Groups = { groupName: data.groupName, usersIds: usersIds };
    await this.groupsRepository.save(newGroup);
  }

  async getGroup() {
    return this.groupsRepository.find();
  }

  async getMyGroups(userId: number) {
    //dlaczego userId staje się stringiem?
    const search = await this.groupsRepository.find();
    return search
      .filter((item) => item.usersIds.includes(Number(userId)))
      .map((item) => item.groupName);
  }
}
