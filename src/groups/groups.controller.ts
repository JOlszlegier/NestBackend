import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupsService } from './groups.service';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}
  @Post()
  @ApiOkResponse({ description: 'Group created' })
  addGroup(@Body() body: CreateGroupDto): any {
    return this.groupsService.addGroup(body);
  }

  @Get()
  getGroup(): any {
    return this.groupsService.getGroup();
  }

  @Get('my-groups')
  @ApiOkResponse({ description: 'List of your groups' })
  getMyGroups(@Query('userId') userId: string): any {
    return this.groupsService.getMyGroups(userId);
  }

  @Get('getUsers')
  @ApiOkResponse({ description: 'Users from group:' })
  getUsersInGroup(
    @Query('groupName') groupName: string,
    @Query('userId') userId: number,
  ): any {
    return this.groupsService.getUsersInGroup(groupName, userId);
  }

  @Get('check-for-expense')
  @ApiOkResponse({ description: 'User can be added' })
  @ApiNotFoundResponse({
    description: 'User was not found/ is not in your group',
  })
  checkFriendForExpense(
    @Query('userId') userId: number,
    @Query('friendEmail') friendEmail: string,
    @Query('groupName') groupName: string,
  ): any {
    return this.groupsService.canFriendBeAddedToExpense(
      userId,
      friendEmail,
      groupName,
    );
  }
}
