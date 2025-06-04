import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ILike, Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostService {
  @InjectRepository(Post) private readonly postRepository: Repository<Post>
  create(createPostDto: CreatePostDto) {
    const post: Post = new Post()
    post.title = createPostDto.title
    post.description = createPostDto.description
    post.user = { id: createPostDto.userid } as any;
    return this.postRepository.save(post)
  }

  findAll() {
    return this.postRepository.find()
  }

  findOne(id: number) {
    return this.postRepository.findOneBy({ id })
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    const value = this.postRepository.update({ id }, { ...updatePostDto })
    return { message: "post updated successfully" }
  }

  remove(id: number) {
    return this.postRepository.delete(id)
  }

  async getAllUsers(page: number, limit: number, search?: string) {
    const skip = (page - 1) * limit;
    const whereClause = search
      ? { title: ILike(`%${search}%`) }
      : {};
    const [users, total] = await this.postRepository.findAndCount({
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

}
