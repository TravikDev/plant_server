import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class TransactionsService {

  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    // @InjectRepository(Category)
    // private categoryRepository: Repository<Category>
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
      // relations: {
      //   category: true,
      //   user: true
      // },
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
    const transactionExist = await this.transactionRepository.findOneBy({ transactionId, user: { userId }})
    if(!transactionExist) throw new BadRequestException("Transaction doesn't exist")
    await this.transactionRepository.update(transactionId, updateTransactionDto)
    return { message: `Transaction ${transactionId} updated` };
  }

  async remove(transactionId: number, userId: number) {
    const transactionExist = await this.transactionRepository.findOneBy({ transactionId, user: { userId } })
    if(!transactionExist) throw new BadRequestException('Transaction not found')
    await this.transactionRepository.delete({ transactionId })
    return { message: `Transaction #${transactionId} removed` }
  }
}
