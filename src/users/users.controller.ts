import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() body: CreateUserDto): any {
    return this.usersService.create(body);
  }

  @Get()
  getUser(@Body() body: CreateUserDto): any {
    return this.usersService.getByEmail(body.email);
  }
}
