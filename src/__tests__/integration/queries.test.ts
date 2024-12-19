import * as dotenv from 'dotenv';
import * as request from 'supertest';

import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../../app.module';
import { INestApplication } from '@nestjs/common';

// Carrega as variáveis de ambiente do .env
dotenv.config();

describe('Queries de integração', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('deve retornar dados da query getApiStatus', async () => {
    const query = `
      query {
        getApiStatus {
          timestamp
          dbStatus {
            type
          }
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200);

    expect(response.body.data).toBeDefined();
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.getApiStatus).toBeDefined();
    expect(response.body.data.getApiStatus).toHaveProperty('timestamp');
    expect(response.body.data.getApiStatus).toHaveProperty('dbStatus');
    expect(typeof response.body.data.getApiStatus.timestamp).toBe('string');
    expect(response.body.data.getApiStatus.dbStatus).toBeDefined();
  });

  it('deve retornar dados da query getApiStatus com o tipo correto de banco de dados', async () => {
    const query = `
      query {
        getApiStatus {
          timestamp
          dbStatus {
            type
          }
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200);

    const expectedDbType = process.env.DATABASE_TYPE || 'PostgreSQL';
    expect(response.body.data.getApiStatus.dbStatus.type).toBe(expectedDbType);
  });
});
