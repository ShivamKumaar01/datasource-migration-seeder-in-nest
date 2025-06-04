import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { Group } from 'src/group/entities/group.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    // @InjectRepository(UserGroup) private groupRepository: Repository<Group>,
  ) { }
  createUSer(createUserDto: CreateUserDto) {
    const user: User = new User()
    user.name = createUserDto.name
    user.email = createUserDto.email
    user.password = createUserDto.password
    user.username = createUserDto.username
    user.gender = createUserDto.gender
    user.age = createUserDto.age
    return this.userRepository.save(user)
  }

  findAll() {
    return this.userRepository.find()
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id })
    // return this.userRepository.findOne({where:{id:id}})
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const value = this.userRepository.update({ id }, { ...updateUserDto })
    return { message: "user updated successfully" }
  }

  //  async remove(id: number) {
  //   const user = await this.userRepository.findOne({ where: { id } });
  //   if (!user) throw new Error('User not found');

  //   return this.userRepository.remove(user); 
  // }

  async remove(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['posts', 'groups'],
    });

    if (!user) throw new Error('User not found');

    // Optional but safe: clear relationships
    user.groups = [];
    await this.userRepository.save(user);

    return this.userRepository.remove(user); // This will also remove posts due to CASCADE
  }

  //  async addUserToGroup(userId: number, groupId: number): Promise<void> {
  //   const user = await this.userRepository.findOne({
  //     where: { id: userId },
  //     relations: ['groups'],
  //   });
  //   if (!user) throw new Error('User not found');


  //   user.groups.push({ id: groupId } as any);
  //   await this.userRepository.save(user);
  // }

  async addUserToGroup(userId: number, groupId: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['groups'],
    });
    if (!user) throw new Error('User not found');

    const group = await this.groupRepository.findOneBy({ id: groupId });
    if (!group) throw new Error('Group not found');

    user.groups.push(group);
    await this.userRepository.save(user);
  }

  usersGroup(id: number) {
    const data = this.userRepository.find({ where: { id: id }, relations: ["groups"] })
    return data;


  }

  // to delete a user then remove it from grp
  // async remove(id: number) {
  //   const user = await this.userRepository.findOne({
  //     where: { id },
  //     relations: ['groups'], // Load relations to clear
  //   });

  //   if (!user) throw new Error('User not found');

  //   // Remove relation explicitly (optional if remove() handles it)
  //   user.groups = [];
  //   await this.userRepository.save(user);

  //   return this.userRepository.remove(user); 
  // }
  async getAllUsers(page: number, limit: number, search?: string) {
    const skip = (page - 1) * limit;
    const whereClause = search
      ? { name: ILike(`%${search}%`) }
      : {};
    const [users, total] = await this.userRepository.findAndCount({
      where: whereClause,
      skip,
      take: limit,
      order: { id: 'ASC' }
    })
    return {
      data: users,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit)
    }
  }

  // 1. Get all users of a particular group
  // async getUsersByGroupId(groupId: number) {
  //   return this.userRepo
  //     .createQueryBuilder('user')
  //     .leftJoin('user.groups', 'group')
  //     .where('group.id = :groupId', { groupId })
  //     .getMany();
  // }

  // // 2. Get all groups of a particular user
  // async getGroupsByUserId(userId: number) {
  //   return this.groupRepo
  //     .createQueryBuilder('group')
  //     .leftJoin('group.users', 'user')
  //     .where('user.id = :userId', { userId })
  //     .getMany();
  // }


}
