import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}

  async create(createCategoryDto: CreateCategoryDto, userId: number) {
    const categoryExist = await this.categoryRepository.findOne({
      where: { ...createCategoryDto, },
      relations: {
        user: true,
        transactions: true
      }
    })

    if(categoryExist) throw new BadRequestException('Category is already exist')

    await this.categoryRepository.save({...createCategoryDto, user: { userId }})

    return { message: 'The category has been created'};
  }

  async findAll() {
    const categoriesAll = await this.categoryRepository.find({ 
      relations: {
        user: true,
        transactions: true,
      }
    })
    return categoriesAll;
  }

  async findOne(categoryId: number) {
    const categoryExist = await this.categoryRepository.findOne({ 
      where: { categoryId },
      relations: { 
        user: true,
        transactions: true
       }

    })
    if(categoryExist) return categoryExist
    return null
  }

  async update(categoryId: number, updateCategoryDto: UpdateCategoryDto) {
    const categoryExist = await this.categoryRepository.findOneBy({ categoryId })
    if(!categoryExist) throw new BadRequestException('Category not found')
    await this.categoryRepository.update(categoryId, updateCategoryDto);
    return { message: 'The category has been updated successfully' }
  }

  async remove(categoryId: number) {
    const categoryExist = await this.categoryRepository.findOneBy({ categoryId })
    if(!categoryExist) return { message: `Category with id ${categoryId} is not found` };
      await this.categoryRepository.delete({ categoryId })
      return { message: 'The category has been deleted successfully' }
  }
}
