import * as dotenv from 'dotenv';
import * as request from 'supertest';

import { INestApplication } from '@nestjs/common';
import { mockLogs } from '../utils/mock-logs.util';

// Carrega as variáveis de ambiente do .env
dotenv.config();

describe('Queries de integração', () => {
  let app: INestApplication;

  beforeAll(async () => {
    // Desabilita todos os logs do console
    mockLogs.setupConsoleMocks();

    // Cria e configura a aplicação de teste
    app = await mockLogs.createTestingApp();
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
