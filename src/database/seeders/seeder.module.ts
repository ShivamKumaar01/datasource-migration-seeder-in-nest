import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from '../../users/entities/user.entity';
import { UserSeeder } from './user.seeder';
import { SeederService } from './seeder.service';
import { User } from 'src/user/entities/user.entity';
import { OrmModule } from 'src/config/typeorm.config';

@Module({
  imports: [OrmModule,TypeOrmModule.forFeature([User])],
  providers: [UserSeeder, SeederService],
  exports: [SeederService],
})
export class SeederModule {}