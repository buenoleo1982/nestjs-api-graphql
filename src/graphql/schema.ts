import { Field, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

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
    dataSource: DataSource,
  ) {
    this.dataSource = dataSource;
  }

  private dataSource: DataSource;
  
  @Query(() => ApiStatus)
  async getApiStatus() {
    const dbQuery = await this.dataSource.query('SELECT * FROM V$VERSION');
    const versionInfo = dbQuery[0];
    const versionMatch = versionInfo.BANNER.match(/Oracle Database (\S+)/);
    const version = versionMatch ? versionMatch[1] : 'Unknown';

    return {
      timestamp: new Date().toISOString(),
      databaseType: 'Oracle',
      databaseVersion: version,
    };
  }
}
