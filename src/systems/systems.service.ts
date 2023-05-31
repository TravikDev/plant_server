import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { System } from './entities/system.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SystemsService {

  constructor(
    @InjectRepository(System)
    private systemRepository: Repository<System>
  ) {}

  async create(createSystemDto: CreateSystemDto, user: User) {

    const systemExist = await this.systemRepository.findOne({ 
      where: { 
        title: createSystemDto.title,
        user: { userId: user.userId }
      },
    })

    // console.log(systemExist)
    if(systemExist) throw new BadRequestException(`System with the same name '${createSystemDto.title}' already exist in user: '${user.username}'`)

    const systemNew = await this.systemRepository.save({ ...createSystemDto, user })

    return { message: 'System added successfully', systemNew };
  }

  async findAll() {
    return await this.systemRepository.find({ relations: { cultures: true, verieties: true, user: true }});
  }

  async findOne(id: number) {
    const systemExist = await this.systemRepository.findOne({ where: { systemId: id }, relations: { cultures: true, verieties: true, user: true }})
    if(!systemExist) throw new BadRequestException('This system doesn\'t exist!')
    return systemExist;
  }

  async update(id: number, updateSystemDto: UpdateSystemDto) {
    const systemExist = await this.systemRepository.findOne({ where: { systemId: id }})
    if(!systemExist) throw new BadRequestException('This system doesn\'t exist!')
    const systemUpdated = await this.systemRepository.save(updateSystemDto)
    return { message: 'System successfully updated', systemUpdated };
  }

  async remove(id: number) {
    const systemExist = await this.systemRepository.findOne({ where: { systemId: id }})
    if(!systemExist) throw new BadRequestException('This system doesn\'t exist!')
    await this.systemRepository.delete(systemExist)
    return { message: 'System successfully deleted', systemExist };
  }
}
