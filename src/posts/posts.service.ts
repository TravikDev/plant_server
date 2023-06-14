import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>
  ) {}

  async create(createPostDto: CreatePostDto, user: User) {
    if(!createPostDto.title) throw new BadRequestException('Empty title')
    if(!createPostDto.content) throw new BadRequestException('Empty content')
    const postNew = await this.postsRepository.save({...createPostDto, user })
    return postNew;
  }

  async findAll() {
    console.log(new Date().toISOString())
    return await this.postsRepository.find({ relations: { culture: true, veriety: true, system: true, user: true }, order: { createdAt: 'DESC' } });
  }

  async findOne(id: number) {
    const postExist = await this.postsRepository.findOne({ where: { postId: id }, relations: { culture: true, veriety: true, system: true, user: true } });
    if(!postExist) throw new BadRequestException(`Post with id: ${id} doesn\'t exist`)
    return postExist;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const postExist = await this.postsRepository.findOne({ where: { postId: id } })
    if(!postExist) throw new BadRequestException('This post doesn\'t exist')
    const postUpdated = await this.postsRepository.save(updatePostDto)
    return { message: 'Post updated successfully', postUpdated };
  }

  async remove(id: number) {
    const postExist = await this.postsRepository.findOne({ where: { postId: id } })
    if(!postExist) throw new BadRequestException('This post doesn\'t exist')
    const postDeleted  = await this.postsRepository.delete(id)
    return { message: 'Post updated successfully', postDeleted };
  }
}
