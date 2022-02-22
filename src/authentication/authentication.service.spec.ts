import { Test } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from '../users/user.entity';
import { UsersService } from '../users/users.service';
import mockedConfigService from '../utils/mocks/config.service';
import mockedJwtService from '../utils/mocks/jwt.service';

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        AuthenticationService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
      ],
    }).compile();
    authenticationService = await module.get<AuthenticationService>(
      AuthenticationService,
    );
  });
  describe('when creating a cookie', () => {
    it('should return a string', () => {
      const userId = 1;
      expect(
        typeof authenticationService.getCookieWithJwtToken(userId),
      ).toEqual('string');
    });
  });

  describe('when logout', () => {
    it('should return a string', () => {
      expect(typeof authenticationService.getCookieForLogOut()).toEqual(
        'string',
      );
    });
  });
});

// describe('AuthenticationService', () => {
//   let service: AuthenticationService;
//   const mockAuthenticationService = {};
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [AuthenticationService],
//     })
//       .overrideProvider(AuthenticationService)
//       .useValue(mockAuthenticationService)
//       .compile();
//
//     service = module.get<AuthenticationService>(AuthenticationService);
//   });
//
//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });
