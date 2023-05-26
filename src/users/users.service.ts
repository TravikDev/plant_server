import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto)
    const userExist = await this.usersRepository.findOneBy({ username: createUserDto.username })
    if(userExist) throw new UnauthorizedException('This user already exist')
    return await this.usersRepository.save(createUserDto)
  }

  async findOne(username: string): Promise<User | undefined> {
    const userExist = await this.usersRepository.findOneBy({ username })
    return userExist
  }

  async findAll() {
    return await this.usersRepository.find()
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
    // return `This action removes a #${id} user`;
  // }
}
