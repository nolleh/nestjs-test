import { DogEntity } from 'entities/dog.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'nolleh',
  password: 'nolleh-test',
  database: 'nolleh_test',
  synchronize: true,
  logging: true,
  entities: [DogEntity],
  subscribers: [],
  migrations: [],
});
