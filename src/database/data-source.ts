import { DataSource } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Group } from '../group/entities/group.entity';
import { Post } from '../post/entities/post.entity';
import { Product } from '../product/entities/product.entity';

const isCompiled = __filename.endsWith('.js');

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'crud-revision',
  synchronize: false,
  logging: true,
  entities: [User, Group, Post, Product],
  migrations: [isCompiled ? 'dist/database/migrations/*.js' : 'src/database/migrations/*.ts'],
  // seeds: [isCompiled ? 'dist/database/seeders/**/*.js' : 'src/database/seeders/**/*.ts'],
});
