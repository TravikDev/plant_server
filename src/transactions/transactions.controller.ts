import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserDecorator } from 'src/users/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createTransactionDto: CreateTransactionDto, @UserDecorator() user: User) {
    return this.transactionsService.create(createTransactionDto, +user.userId);
  }

  @Get()
  findAll(@UserDecorator() user: User) {
    return this.transactionsService.findAll(+user.userId);
  }

  @Get(':transactionId')
  findOne(@Param('transactionId') transactionId: string) {
    return this.transactionsService.findOne(+transactionId);
  }

  @Patch(':transactionId')
  update(
    @Param('transactionId') transactionId: string, 
    @Body() updateTransactionDto: UpdateTransactionDto, 
    @UserDecorator() user: User) {
      console.log(user)
    return this.transactionsService.update(+transactionId, updateTransactionDto, +user.userId);
  }

  @Delete(':transactionId')
  remove(
    @Param('transactionId') transactionId: string,
    @UserDecorator() user: User
  ) {
    return this.transactionsService.remove(+transactionId, +user.userId);
  }
}
