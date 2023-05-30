import { Module } from '@nestjs/common';
import { CulturesService } from './cultures.service';
import { CulturesController } from './cultures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Culture } from './entities/culture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Culture])],
  controllers: [CulturesController],
  providers: [CulturesService]
})
export class CulturesModule {}
