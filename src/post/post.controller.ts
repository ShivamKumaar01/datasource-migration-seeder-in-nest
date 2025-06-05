import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get('posts')
  async getPostsByQueryAndParams(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 3,
    @Query('userid') userid?: number,
  ) {
    return this.postService.getPostsByQueryAndParams(+page, +limit, userid);
  }

  @Get()
  async getAllUsers(
    @Query('page',ParseIntPipe) page: number = 1,
    @Query('limit',ParseIntPipe) limit: number = 3,
    @Query('search') search?: string,
  ) {
    return this.postService.getAllUsers(page, limit, search)

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.postService.remove(id);
  }
}
