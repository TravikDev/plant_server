import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVerietyDto } from './dto/create-veriety.dto';
import { UpdateVerietyDto } from './dto/update-veriety.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Veriety } from './entities/veriety.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class VerietiesService {

  constructor(
    @InjectRepository(Veriety)
    private verietyRepository: Repository<Veriety>
  ) { }

  async create(createVerietyDto: CreateVerietyDto, user: User) {

    let verietyAdded

    const verietyWithUserExist = await this.verietyRepository.findOne({
      where: {
        title: createVerietyDto.title,
        culture: {
          cultureId: createVerietyDto.culture.cultureId
        },
        users: user
      },
      relations: { culture: true }
    })

    if (verietyWithUserExist) throw new BadRequestException('This user has already this veriety type')

    const verietyExist = await this.verietyRepository.findOne({
      where: {
        title: createVerietyDto.title,
        culture: {
          cultureId: createVerietyDto.culture.cultureId
        },
      },
      relations: { culture: true }
    })

    console.log(verietyExist, verietyWithUserExist)

    console.log(user)
    if (!verietyExist) {
      verietyAdded = await this.verietyRepository.save({ ...createVerietyDto, users: [user] })
      console.log('here')
      return { message: 'Veriety added', verietyAdded }
    }

    verietyAdded = await this.verietyRepository.save(verietyExist)

    return { message: 'Veriety added', verietyAdded };
  }

  async findAll() {
    return await this.verietyRepository.find({ relations: { culture: true, users: true } });
  }

  findOne(id: number) {
    return `This action returns a #${id} veriety`;
  }

  update(id: number, updateVerietyDto: UpdateVerietyDto) {
    return `This action updates a #${id} veriety`;
  }

  async remove(title: string) {
    const verietyExist = await this.verietyRepository.findOne({ where: { title } })
    console.log(verietyExist)
    if (!verietyExist) throw new BadRequestException('Veriety doesn\'t exist')
    await this.verietyRepository.delete({ title })
    return { message: 'Veriety deleted', verietyExist };
  }
}
