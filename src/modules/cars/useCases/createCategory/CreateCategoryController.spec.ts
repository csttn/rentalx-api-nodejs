import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcrypt';
import { Connection } from 'typeorm';

import { app } from '@shared/infra/http/app';

import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('Create Category Controller', () => {
  beforeEach(async () => {
    connection = await createConnection();

    await connection.synchronize(true);

    // await connection.runMigrations();

    const id = uuidV4();
    const password = await hash('admin', 8);

    await connection.query(`INSERT INTO USERS (id, name, email, password, "isAdmin", created_at, driver_license,avatar)
    values ('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'true', 'now()', 'XXXXX', "avatar")
    `);
  });

  afterAll(async () => {
    // await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });
    console.log(responseToken.body);
  });
});
