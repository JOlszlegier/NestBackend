import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}
  @Post()
  addGroup(@Body() body: CreateGroupDto): any {
    return this.groupsService.addGroup(body);
  }

  @Get()
  getGroup(): any {
    return this.groupsService.getGroup();
  }

  @Get('my-groups')
  getMyGroups(@Query('userId') userId: number): any {
    return this.groupsService.getMyGroups(userId);
  }
}
