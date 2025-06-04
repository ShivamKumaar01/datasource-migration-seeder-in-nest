// import { Post } from '@nestjs/common';
// import { Group } from 'src/group/entities/group.entity';
// import { Post } from 'src/post/entities/post.entity';
// import { User } from 'src/user/entities/user.entity';
// import { DataSource } from 'typeorm';

// export default new DataSource({
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   synchronize: false,
//   password: 'admin',
//   database: 'crud-revision',
//   migrations: ['src/migrations/*.ts'],
//   entities: [User,Post,Group],
// });