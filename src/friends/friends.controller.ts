import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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
  addFriend(@Body() body: { userId: number; email: string }): any {
    return this.friendsService.addFriendByEmail(body.email, body.userId);
  }

  @Get()
  //api body ?
  getFriends(@Query('userId') userId: number): any {
    return this.friendsService.getFriendsList(userId);
  }
}
