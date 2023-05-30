import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCultureDto } from './dto/create-culture.dto';
import { UpdateCultureDto } from './dto/update-culture.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Culture } from './entities/culture.entity';
import { In, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CulturesService {

  constructor(
    @InjectRepository(Culture)
    private cultureRepository: Repository<Culture>
  ) { }

  async create(createCultureDto: CreateCultureDto, user: User) {

    let cultureAdded

    const cultureExist = await this.cultureRepository.findOne({
      where: { title: createCultureDto.title },
      relations: { users: true }
    })

    const cultureByUserExist = await this.cultureRepository.findOne({
      where: { title: createCultureDto.title, users: user },
      relations: { users: true }
    })

    if (cultureByUserExist) throw new BadRequestException('This user already has this culture type')

    if (!cultureExist) {
      cultureAdded = await this.cultureRepository.save({ title: createCultureDto.title, users: [user] })
      console.log(cultureAdded)
      return { message: 'Culture type added', cultureAdded }
    }

    cultureExist.users.push(user)

    cultureAdded = await this.cultureRepository.save(cultureExist)

    return { message: 'Culture type added', cultureAdded };
  }

  async findAll() {
    return await this.cultureRepository.find({ order: { title: 'ASC' }, relations: { users: true, verieties: true } });
  }

  findOne(title: string) {
    return this.cultureRepository.findOne({ where: { title}, relations: { users: true, verieties: true } });
  }

  // update(id: number, updateCultureDto: UpdateCultureDto) {
  //   return `This action updates a #${id} culture`;
  // }

  async removeCultureFromUser(title: string, user: User) {

    // console.log(user.userId)
    const userCultureExist = await this.cultureRepository.findOne({ where: { title, users: user }, relations: { users: true }})
    if(!userCultureExist) throw new BadRequestException('Culture not found in your list')
    // console.log(userCultureExist.users[0].userId)
    // console.log(userCultureExist.users)

    const cultureExist = await this.cultureRepository.findOne({ where: { cultureId: userCultureExist.cultureId }, relations: { users: true }})
    // console.log(cultureExist)
    const cultureUserArr = cultureExist.users.filter(usr => usr.userId !== user.userId)
    // console.log(cultureUserArr)
    const cultureWithoutUser = await this.cultureRepository.save({ ...cultureExist, users: cultureUserArr })
    return { message: 'Culture has been deleted from the user', cultureWithoutUser }
  }

  // remove(id: number) {
  //   return `This action removes a #${id} culture`;
  // }
}
