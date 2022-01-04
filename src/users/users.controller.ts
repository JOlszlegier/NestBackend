import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers(): any {
    return [{ id: 0 }];
  }

  @Get(':id')
  getUserById(@Param('id') id: string): any {
    return {
      id,
    };
  }
}
