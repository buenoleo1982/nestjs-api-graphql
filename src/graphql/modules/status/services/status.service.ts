import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { ApiStatus } from '@/graphql/modules/status/types/status.type';
import { DbStatus } from '@/graphql/modules/status/types/status.type';

@Injectable()
export class StatusService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
    private configService: ConfigService,
  ) {}

  async getStatus(): Promise<ApiStatus> {
    const dbType = this.configService.get('DB_TYPE');
    let dbStatus: DbStatus = {
      type: '',
      version: 'Unknown',
    };

    try {
      const versionInfo = await this.getDatabaseVersion(dbType);
      dbStatus = {
        type: versionInfo.type,
        version: versionInfo.version,
      };
    } catch (error) {
      console.error('Erro ao obter versão do banco:', error);
      dbStatus.type = dbType || 'Unknown';
    }

    return {
      timestamp: new Date().toISOString(),
      dbStatus,
    };
  }

  private async getDatabaseVersion(
    dbType: string,
  ): Promise<{ type: string; version: string }> {
    switch (dbType) {
      case 'oracle':
        return this.getOracleVersion();
      case 'mssql':
        return this.getMSSQLVersion();
      case 'postgres':
      default:
        return this.getPostgresVersion();
    }
  }

  private async getOracleVersion(): Promise<{ type: string; version: string }> {
    const oracleQuery = await this.dataSource.query('SELECT * FROM V$VERSION');
    const oracleVersion = oracleQuery[0];
    const versionMatch = oracleVersion.BANNER.match(/Oracle Database (\S+)/);
    return {
      type: 'Oracle',
      version: versionMatch ? versionMatch[1] : 'Unknown',
    };
  }

  private async getMSSQLVersion(): Promise<{ type: string; version: string }> {
    try {
      const mssqlQuery = await this.dataSource.query(
        'SELECT @@VERSION as VERSION',
      );
      const mssqlVersion = mssqlQuery[0];
      const sqlServerMatch = mssqlVersion.VERSION.match(
        /Microsoft SQL Server (\d{4}).*?(\d+\.\d+\.\d+\.\d+\s+\(X64\))/,
      );
      return {
        type: 'SQL Server',
        version: sqlServerMatch
          ? `${sqlServerMatch[1]} - ${sqlServerMatch[2]}`
          : 'Unknown',
      };
    } catch (error) {
      console.error('Erro ao obter versão do SQL Server:', error);
      return {
        type: 'SQL Server',
        version: 'Error getting version',
      };
    }
  }

  private async getPostgresVersion(): Promise<{
    type: string;
    version: string;
  }> {
    const pgQuery = await this.dataSource.query('SELECT version()');
    const pgVersion = pgQuery[0];
    const postgresMatch = pgVersion.version.match(/PostgreSQL (\d+\.\d+)/);
    return {
      type: 'PostgreSQL',
      version: postgresMatch ? postgresMatch[1] : 'Unknown',
    };
  }
}
