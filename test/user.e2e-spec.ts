import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from '../src/users/user.entity';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  const mockUsers = [{ id: 1, name: 'Kuba' }];
  const mockNewUser = {
    name: 'Bob',
    email: 'test@test.com',
    password: 'typicalpassword',
  };
  const mockUsersRepository = {
    find: jest.fn().mockResolvedValue(mockUsers),
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((user) => Promise.resolve({ user })),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUsersRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users/all')
      .expect(200)
      .expect(mockUsers);
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(mockNewUser)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) =>
        expect(response.body).toEqual({
          email: 'test@test.com',
          income: 0,
          name: 'Bob',
          outcome: 0,
          password: 'typicalpassword',
        }),
      );
  });
});
