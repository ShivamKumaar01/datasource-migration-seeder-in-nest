// import { DataSource } from 'typeorm';
// import { ConfigService } from '@nestjs/config';
// import { config } from 'dotenv';
// import { User } from 'src/user/entities/user.entity';
// import { Group } from 'src/group/entities/group.entity';
// import { Post } from 'src/post/entities/post.entity';
// import { Product } from 'src/product/entities/product.entity';
// // import { Test } from 'src/test/entities/test.entity';
// // import { Testing } from 'src/testing/entities/testing.entity';
// config();

// const configService = new ConfigService();


// const AppDataSource = new DataSource({
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   password: 'admin',
//   database: 'crud-revision',
//   username: 'postgres',
//   synchronize: true,
//   // entities: ['**/*.entity.ts'],
//   entities: [User, Post, Group, Product],
//   // "entities": ["dist/**/*.entity{ .ts,.js}"],
//   migrations: ['src/database/migrations/*-migration.ts'],
//   migrationsRun: false,
//   logging: true,
// });

// export default AppDataSource;
import { DataSource } from 'typeorm';
import { Global, Module } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { Post } from 'src/post/entities/post.entity';
import { Group } from 'src/group/entities/group.entity';

@Global() // makes the module available globally for other modules once imported in the app modules
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource, // add the datasource as a provider
      inject: [],
      useFactory: async () => {
        // using the factory function to create the datasource instance
        try {
          const dataSource = new DataSource({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'admin',
            database: 'crud-revision',
            synchronize: true,
            // entities: [`${__dirname}/../**/**.entity{.ts,.js}`], // this will automatically load all entity file in the src folder
            entities: [User, Post, Group],
            // migrations: ['src/database/migrations/*-migration.ts'],
            // migrationsRun: false,
            // logging: true,
          });
          await dataSource.initialize(); // initialize the data source
          console.log('Database connected successfully');
          return dataSource;
        } catch (error) {
          console.log('Error connecting to database');
          throw error;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class OrmModule { }