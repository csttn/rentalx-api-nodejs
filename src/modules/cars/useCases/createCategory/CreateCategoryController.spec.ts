import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcrypt';
import { Connection } from 'typeorm';

import { app } from '@shared/infra/http/app';

import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash('admin', 8);

    await connection.query(`INSERT INTO USERS (id, name, email, password, "isAdmin", created_at, driver_license)
    values ('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'true', 'now()', 'XXXXX')
    `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'categoria dos deuses',
        description: 'descrição dos deuses',
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.statusCode).toBe(201);
  });
  it('should not able to create a new category with name exists', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });

    const { refresh_token } = responseToken.body;
    await request(app)
      .post('/categories')
      .send({
        name: 'categoria dos deuses',
        description: 'descrição dos deuses',
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'categoria dos deuses',
        description: 'descrição dos deuses',
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });
    expect(response.statusCode).toBe(400);
  });

  it('should be able list all categories', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .get('/categories')
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.statusCode).toBe(200);
  });
});
