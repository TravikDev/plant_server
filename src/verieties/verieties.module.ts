import { Module } from '@nestjs/common';
import { VerietiesService } from './verieties.service';
import { VerietiesController } from './verieties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Veriety } from './entities/veriety.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Veriety])],
  controllers: [VerietiesController],
  providers: [VerietiesService]
})
export class VerietiesModule {}
