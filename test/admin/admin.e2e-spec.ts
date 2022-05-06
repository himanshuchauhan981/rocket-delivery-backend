import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AdminModule } from '../../src/modules/admin/admin.module';
import { MailModule } from '../../src/core/utils/mail/mail.module';
import DatabaseModule from '../../src/core/database/database.module';
import { STATUS_CODE } from '../../src/core/constants/status_code';
import { MESSAGES } from '../../src/core/constants/messages';
import { Admin } from '../../src/modules/admin/admin.entity';

interface AdminPayload {
  email: string;
  password: string;
}

describe('AdminController (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;
  let adminPayload: AdminPayload;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AdminModule, MailModule, ...DatabaseModule],
      providers: [],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Login with correct credentials', async () => {
    adminPayload = {
      email: 'rocketAdmin@yopmail.com',
      password: '123456',
    };

    const response = await request(app.getHttpServer())
      .post('/admin/login')
      .send(adminPayload);

    jwtToken = response.body.token;
    console.log(response.body);

    expect(response.body.statusCode).toEqual(201);
    expect(jwtToken).toBeDefined();
  });

  it('Login with incorrect credentials', async () => {
    const payload = {
      email: 'rocketAdmin@yopmail.com',
      password: 'incorrect_password',
    };

    const response = await request(app.getHttpServer())
      .post('/admin/login')
      .send(payload);

    const expectedResponse = {
      statusCode: STATUS_CODE.UNAUTHORIZED,
      message: MESSAGES.INVALID_CREDS,
      error: 'Unauthorized',
    };

    expect(response.body.statusCode).toEqual(STATUS_CODE.UNAUTHORIZED);
    expect(response.body).toStrictEqual(expectedResponse);
  });

  it('Get admin details', async () => {
    const response = await request(app.getHttpServer())
      .get('/admin/details')
      .set('Authorization', `Bearer ${jwtToken}`);

    const adminDetails = await Admin.findOne({
      where: { email: adminPayload.email },
    });

    const expectedResponse = {
      adminDetails: {
        email: adminDetails.email,
        id: adminDetails.id,
      },
    };

    expect(response.body.statusCode).toEqual(STATUS_CODE.SUCCESS);
    expect(response.body.data).toStrictEqual(expectedResponse);
  });

  it('Get admin details without JWT Token', async () => {
    const response = await request(app.getHttpServer()).get('/admin/details');

    expect(response.body.statusCode).toEqual(STATUS_CODE.UNAUTHORIZED);
  });

  afterAll(async () => {
    await app.close();
  });
});
