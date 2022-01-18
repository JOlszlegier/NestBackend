import { UsersService } from '../users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import RegisterDto from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { PostgresErrorCode } from '../database/postgresErrorCodes.enum';

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UsersService) {}

  public async register(registrationData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const newUser = {
        ...registrationData,
        password: hashedPassword,
      };
      const createdUser = await this.usersService.createUser(newUser);
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private static async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      await AuthenticationService.verifyPassword(
        plainTextPassword,
        user.password,
      );
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
