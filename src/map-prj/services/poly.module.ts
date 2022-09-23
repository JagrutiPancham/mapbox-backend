/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PolyController } from '../controllers/poly.controller';
import { poly } from '../entities/polygon.entity';
import { PolyService } from './poly.service';
@Module({
  imports:[TypeOrmModule.forFeature([ poly])],
  providers: [PolyService],
  controllers: [PolyController],
})
export class PolyModule {}