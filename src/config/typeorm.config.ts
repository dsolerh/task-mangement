import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'dsolerh',
  password: 'pa$$w0rd',
  database: 'task-management',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
};
