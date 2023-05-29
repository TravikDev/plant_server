import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe, Query } from '@nestjs/common';
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
  
  @Get('feed')
  pagination(
    @Query('currentCount') currentCount: number,
    @Query('nextCount') nextCount: number,
    @Query('category') category: string[] = [],
    @Query('type') type: string[] = [],
    @Query('sortType') sortType: string,
    @Query('sortOrder') sortOrder: string,
    @UserDecorator() user: User
    ) {
    return this.transactionsService.pagination(currentCount, nextCount, category, type, sortType, sortOrder);
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
