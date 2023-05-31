import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from "argon2"

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const userExist = await this.usersRepository.findOneBy({ username: createUserDto.username })
    if (userExist) throw new UnauthorizedException('This user already exist')
    const password = await argon2.hash(createUserDto.password)
    return await this.usersRepository.save({ ...createUserDto, password })
  }

  async findOne(username: string): Promise<User | undefined> {
    const userExist = await this.usersRepository.findOne({
      where: { username },
      relations: { cultures: true, verieties: true, systems: true, posts: true }
    })
    return userExist
  }

  async findAll() {
    return await this.usersRepository.find({
      relations: { cultures: true, verieties: true, systems: true, posts: true }
    })
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  async remove(username: string) {
    const userExist = await this.usersRepository.findOneBy({ username })
    if (userExist) {
      await this.usersRepository.delete({ username })
      return `User ${username} has been deleted`
    } else {
      return 'No one user with this username'
    }
  }
}
