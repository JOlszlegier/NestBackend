import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @ApiOkResponse({
    description: 'User created',
  })
  createUser(@Body() body: CreateUserDto): any {
    return this.usersService.createUser(body);
  }

  @Get('/all')
  @ApiOkResponse({
    description: 'All users',
  })
  getUsers(): any {
    return this.usersService.getAllUsers();
  }

  @Get('/email')
  getUserByEmail(@Body() body: { email: string }): any {
    return this.usersService.getByEmail(body.email);
  }
}
