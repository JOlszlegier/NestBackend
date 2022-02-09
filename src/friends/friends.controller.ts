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
  @ApiOkResponse({ description: 'list of your friends' })
  @ApiNotFoundResponse({ description: ' user does not have any friends' })
  getFriends(@Query('userId') userId: number): any {
    return this.friendsService.getFriendsList(userId);
  }

  @Get('check')
  @ApiOkResponse({ description: 'This friend is on the list!' })
  @ApiNotFoundResponse({ description: 'This user is not on the list!' })
  checkFriend(
    @Query('userId') userId: number,
    @Query('friendEmail') friendEmail: string,
  ): any {
    return this.friendsService.isFriendOnTheList(userId, friendEmail);
  }
}
