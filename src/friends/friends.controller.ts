import { Body, Controller, Get } from '@nestjs/common';
import { FriendsService } from './friends.service';

@Controller('friends')
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  @Get()
  getUsersByEmails(@Body() body: { emails: [string] }): any {
    return this.friendsService.getUsersByEmails(body.emails);
  }
}
