import { Body, Controller, Post } from '@nestjs/common';
import { FriendsService } from './friends.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CreateFriendDto } from './dto/create-friend.dto';

@Controller('friends')
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  @Post()
  @ApiBody({ type: CreateFriendDto })
  @ApiOkResponse({
    description: 'Friend added!',
  })
  @ApiBadRequestResponse({
    description: 'User already on the list',
  })
  @ApiNotFoundResponse({
    description: 'User with that email is not registered',
  })
  addFriend(@Body() body: { userId: string; email: string }): any {
    return this.friendsService.getUsersByEmails(body.email, body.userId);
  }
}
