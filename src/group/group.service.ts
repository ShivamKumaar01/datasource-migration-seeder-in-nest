import { HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, getConnection, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class GroupService {

  constructor(
    @InjectRepository(Group) private readonly groupRepository: Repository<Group>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private datasource: DataSource,
    // @Inject('DATA_SOURCE') private readonly dataSource: DataSource,
    // @InjectRepository(UserGroup) private groupRepository: Repository<Group>,
  ) { }
  create(createGroupDto: CreateGroupDto) {
    const group: Group = new Group();
    group.title = createGroupDto.title
    console.log(group.title, "this is title")
    group.description = createGroupDto.description
    group.admin = createGroupDto.admin
    return this.groupRepository.save(group)

    // return 'This action adds a new group';
  }

  findAll() {
    return this.groupRepository.find()
  }

  findOne(id: number) {
    return this.groupRepository.findOneBy({ id })
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    const value = this.groupRepository.update({ id }, { ...updateGroupDto })
    return { message: "user updated successfully" }
  }

  // remove(id: number) {
  //   return this.groupRepository.delete(id)
  // }
  findUsers(id: number) {
    return this.groupRepository.findOne({
      where: { id },
      relations: ['users'],

    });
  }


  async removeGroup(id: number) {

    const queryRunner = this.datasource.createQueryRunner()
    // method reserves a connection from the connection pool.
    await queryRunner.connect()
    await queryRunner.startTransaction();
    try {
      const group = await this.groupRepository.findOne({
        where: { id },
        relations: ['users'],
      });

      if (!group) throw new NotFoundException('Group not found');

      // Remove relation explicitly

      group.users = [];
      await queryRunner.manager.save(group);
      console.log("hi ");
      let value = 1;
      if (value) {
        throw new Error("error in db connection")
      }

      await queryRunner.manager.remove(group);
      // return {message:"group deleted successfully"}

      await queryRunner.commitTransaction()
    }
    catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    }
    finally {
      await queryRunner.release();
    }


  }
  // another method to do transaction
  //   async removeGroup(id: number) {
  //   try {
  //     await this.datasource.transaction(async (manager) => {
  //       const groupRepository = manager.getRepository(Group);

  //       const group = await groupRepository.findOne({
  //         where: { id },
  //         relations: ['users'],
  //       });

  //       if (!group) {
  //         throw new NotFoundException('Group not found');
  //       }

  //       // Break relation with users
  //       group.users = [];
  //       await groupRepository.save(group);

  //       console.log("hi");
  //       let value = 1;
  //       if (value) {
  //         throw new Error("error in db connection");
  //       }

  //       await groupRepository.remove(group);
  //     });

  //     return { message: "Group deleted successfully" };
  //   } catch (err) {
  //     console.error("Transaction failed:", err.message);
  //     throw new HttpException("Failed to delete group", 500);
  //   }
  // }


}
