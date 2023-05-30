import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { VerietiesService } from './verieties.service';
import { CreateVerietyDto } from './dto/create-veriety.dto';
import { UpdateVerietyDto } from './dto/update-veriety.dto';
import { UserDecorator } from 'src/users/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('verieties')
@UseGuards(JwtAuthGuard)
export class VerietiesController {
  constructor(private readonly verietiesService: VerietiesService) {}

  @Post()
  create(@Body() createVerietyDto: CreateVerietyDto, @UserDecorator() user: User) {
    return this.verietiesService.create(createVerietyDto, user);
  }

  @Get()
  findAll() {
    return this.verietiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.verietiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVerietyDto: UpdateVerietyDto) {
    return this.verietiesService.update(+id, updateVerietyDto);
  }

  @Delete(':title')
  remove(@Param('title') title: string) {
    return this.verietiesService.remove(title);
  }
}
