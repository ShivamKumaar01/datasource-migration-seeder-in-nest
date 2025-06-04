import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUSer(createUserDto);
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
    @Post(':userId/groups/:groupId')
  async addUserToGroup(@Param('userId') userId: number, @Param('groupId') groupId: number) {
    await this.userService.addUserToGroup(userId, groupId);
    return { message: 'User added to group successfully' };
  }

    @Get('groups/:userid')
  getGroup(@Param('userid') userid:number){
    return this.userService.usersGroup(userid);
  }

  // query and params and search in pagination
  @Get()
  async getAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 3,
    @Query('search') search?: string,
  ){
    return this.userService.getAllUsers(+page,+limit,search)

  }


  //  // GET /users/by-group/1
  // @Get('by-group/:groupId')
  // async getUsersByGroup(@Param('groupId', ParseIntPipe) groupId: number) {
  //   return this.userService.getUsersByGroupId(groupId);
  // }

  // // GET /users/groups/1
  // @Get('groups/:userId')
  // async getGroupsByUser(@Param('userId', ParseIntPipe) userId: number) {
  //   return this.userService.getGroupsByUserId(userId);
  // }
  

  
}
