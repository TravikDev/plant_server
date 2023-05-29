import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { In, Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class TransactionsService {

  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) { }

  async create(createTransactionDto: CreateTransactionDto, userId: number) {
    const transactionNew = {
      ...createTransactionDto,
      user: { userId },
    }
    await this.transactionRepository.save(transactionNew)
    return { message: "Transaction has been added successfully" };
  }

  async findAll(userId: number) {
    const transactionsAll = await this.transactionRepository.find({
      where: {
        user: { userId }
      },
      relations: {
        category: true,
      //   user: true
      },
      order: { createdAt: 'DESC' },

    })
    return transactionsAll;
  }

  async findOne(transactionId: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { transactionId },
      relations: {
        category: true
        // user: true,
      }
    })
    if (!transaction) throw new BadRequestException('Transaction not found')
    return transaction;
  }

  async update(
    transactionId: number,
    updateTransactionDto: UpdateTransactionDto,
    userId: number
  ) {
    // console.log(userId)
    const transactionExist = await this.transactionRepository.findOneBy({ transactionId, user: { userId } })
    if (!transactionExist) throw new BadRequestException("Transaction doesn't exist")
    await this.transactionRepository.update(transactionId, updateTransactionDto)
    return { message: `Transaction ${transactionId} updated` };
  }

  async remove(transactionId: number, userId: number) {
    const transactionExist = await this.transactionRepository.findOneBy({ transactionId, user: { userId } })
    if (!transactionExist) throw new BadRequestException('Transaction not found')
    await this.transactionRepository.delete({ transactionId })
    return { message: `Transaction #${transactionId} removed` }
  }

  async pagination(
    currentCount: number,
    nextCount: number,
    categories: string[] = [],
    type: string[] = [],
    sortType: string,
    sortOrder: string
  ) {

    // console.log(type, typeof type)
    let allCategories = []
    let allTypes = []

    if(typeof type === 'string') allTypes = [type]
    if(!type.length) allTypes = ['income', 'outcome', 'in1come']

    // console.log(allTypes, typeof allTypes)
    // console.log(type.length  ? [type] : allTypes)

    const categoriesFetched = await this.categoryRepository.find({ select: { title: true } })

    if (typeof categories === 'string') allCategories = [categories]
    if (!categories.length) {
      for (let i = 0; i < categoriesFetched.length; i++) {
        allCategories.push(categoriesFetched[i].title)
      }
    }

    const transactionsList = await this.transactionRepository.find({
      where: { 
        category: { title: In(categories.length && typeof categories !== 'string' ? categories : allCategories) },
        type: In(type.length > 1 && typeof type !== 'string' ? type : allTypes)
      },
      order: { [(sortType ? sortType : 'createdAt')]: (sortOrder ? sortOrder : 'DESC') },
      relations: { category: true },
      skip: currentCount,
      take: nextCount
    })

    return { transactions: transactionsList, categories, allCategories }
  }
}
