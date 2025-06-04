import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { GroupModule } from './group/group.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Group } from './group/entities/group.entity';
import { Post } from './post/entities/post.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { OrmModule } from './config/typeorm.config';
// import dataSource from 'data-source';


@Module({
  // imports: [TypeOrmModule.forRoot(
  //   // dataSourceOptions
    
  //   {
  //     type: 'postgres',
  //     host: 'localhost',
  //     port: 5432,
  //     password: 'admin',
  //     username: 'postgres',
  //     // entities: ['dist/**/*,entity.js'],
  //     entities: [User, Group, Post, Product],
  //     database: 'crud-revision',
  //     synchronize: true,//Indicates if database schema should be auto created on every application launch.
  //     logging: true,
  //     migrations: ['src/database/migrations/*-migration.ts'],
  //     migrationsRun: false,

  //     // migrations:[] //it shows query in console
  //   }
  // ), UserModule, PostModule, GroupModule, ProductModule],
  imports:[OrmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
