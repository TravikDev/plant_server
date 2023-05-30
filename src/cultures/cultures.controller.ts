import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CulturesService } from './cultures.service';
import { CreateCultureDto } from './dto/create-culture.dto';
import { UpdateCultureDto } from './dto/update-culture.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserDecorator } from 'src/users/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('cultures')
export class CulturesController {
  constructor(private readonly culturesService: CulturesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createCultureDto: CreateCultureDto, @UserDecorator() user: User) {
    return this.culturesService.create(createCultureDto, user);
  }

  @Get()
  findAll() {
    return this.culturesService.findAll();
  }

  @Get(':title')
  findOne(@Param('title') title: string) {
    return this.culturesService.findOne(title);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCultureDto: UpdateCultureDto) {
  //   return this.culturesService.update(+id, updateCultureDto);
  // }

  @Delete(':title')
  @UseGuards(JwtAuthGuard)
  removeCultureFromUser(@Param('title') title: string, @UserDecorator() user: User) {
    return this.culturesService.removeCultureFromUser(title, user)
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.culturesService.remove(+id);
  // }
}
