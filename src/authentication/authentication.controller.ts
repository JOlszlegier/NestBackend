import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import RegisterDto from './dto/register.dto';
import LoginDto from './dto/login.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post()
  createUser(@Body() body: RegisterDto): any {
    return this.authenticationService.register(body);
  }

  @Get()
  login(@Body() body: LoginDto): any {
    return this.authenticationService.getAuthenticatedUser(
      body.email,
      body.password,
    );
  }
}
