/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapController } from '../controllers/map.controller';
import { MapEntity } from '../entities/map.entity';
import { MapService } from './map.service';


@Module({
  imports:[TypeOrmModule.forFeature([ MapEntity])],
  providers: [MapService],
  controllers: [MapController],
})
export class MapModule {}