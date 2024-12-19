import { AppModule } from '@/app.module';
import { INestApplication } from '@nestjs/common';
import { Logger } from '@/logger/logger.service';
import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing';
import typeOrmConfig from '@/config/typeorm.config';

export const mockLogs = {
  setupConsoleMocks: () => {
    console.log = jest.fn();
    console.error = jest.fn();
    console.warn = jest.fn();
    console.debug = jest.fn();
    console.info = jest.fn();
  },

  getTypeOrmMockConfig: () => ({
    overrideProvider: {
      provide: 'TypeOrmConfigService',
      useValue: {
        createTypeOrmOptions: () => ({
          ...typeOrmConfig,
          logging: false,
          logger: 'silent',
        }),
      },
    },
  }),

  getLoggerMockConfig: () => ({
    overrideProvider: {
      provide: Logger,
      useValue: {
        log: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn(),
        verbose: jest.fn(),
      },
    },
  }),

  setupAppLogger: (app: INestApplication) => {
    app.useLogger(false);
  },

  createTestingModule: async (): Promise<TestingModule> => {
    return await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(
        mockLogs.getTypeOrmMockConfig().overrideProvider.provide,
      )
      .useValue(mockLogs.getTypeOrmMockConfig().overrideProvider.useValue)
      .overrideProvider(mockLogs.getLoggerMockConfig().overrideProvider.provide)
      .useValue(mockLogs.getLoggerMockConfig().overrideProvider.useValue)
      .compile();
  },

  createTestingApp: async (): Promise<INestApplication> => {
    const moduleFixture = await mockLogs.createTestingModule();
    const app = moduleFixture.createNestApplication();
    mockLogs.setupAppLogger(app);
    await app.init();
    return app;
  },
};
