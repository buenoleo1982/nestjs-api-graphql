import { Field, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@ObjectType()
export class ApiStatus {
  @Field()
  timestamp: string;

  @Field()
  databaseType: string;

  @Field()
  databaseVersion: string;
}

@Resolver()
export class StatusResolver {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
    private configService: ConfigService,
  ) {}

  @Query(() => ApiStatus)
  async getApiStatus() {
    const dbType = this.configService.get('DB_TYPE');
    let databaseType = '';
    let version = 'Unknown';

    try {
      switch (dbType) {
        case 'oracle':
          const oracleQuery = await this.dataSource.query(
            'SELECT * FROM V$VERSION',
          );
          const oracleVersion = oracleQuery[0];
          const versionMatch = oracleVersion.BANNER.match(
            /Oracle Database (\S+)/,
          );
          version = versionMatch ? versionMatch[1] : 'Unknown';
          databaseType = 'Oracle';
          break;

        case 'mssql':
          try {
            const mssqlQuery = await this.dataSource.query(
              'SELECT @@VERSION as VERSION',
            );
            const mssqlVersion = mssqlQuery[0];
            const sqlServerMatch = mssqlVersion.VERSION.match(
              /Microsoft SQL Server (\d{4}).*?(\d+\.\d+\.\d+\.\d+\s+\(X64\))/,
            );
            version = sqlServerMatch
              ? `${sqlServerMatch[1]} - ${sqlServerMatch[2]}`
              : 'Unknown';
            databaseType = 'SQL Server';
          } catch (error) {
            console.error('Erro ao obter versão do SQL Server:', error);
            version = 'Error getting version';
            databaseType = 'SQL Server';
          }
          break;

        case 'postgres':
        default:
          const pgQuery = await this.dataSource.query('SELECT version()');
          const pgVersion = pgQuery[0];
          const postgresMatch = pgVersion.version.match(
            /PostgreSQL (\d+\.\d+)/,
          );
          version = postgresMatch ? postgresMatch[1] : 'Unknown';
          databaseType = 'PostgreSQL';
          break;
      }
    } catch (error) {
      console.error('Erro ao obter versão do banco:', error);
      databaseType = dbType || 'Unknown';
    }

    return {
      timestamp: new Date().toISOString(),
      databaseType,
      databaseVersion: version,
    };
  }
}
