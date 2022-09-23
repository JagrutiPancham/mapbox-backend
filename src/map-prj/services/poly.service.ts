/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Polygon } from 'geojson';
import {  Repository, } from 'typeorm';
import { poly } from '../entities/polygon.entity';

@Injectable()
export class PolyService {
  
    constructor(
        @InjectRepository(poly)
        private polyRepository: Repository<poly>
    ) {}

    async createpoly(createParcelPointDto: poly): Promise<any> {
        const polygon = {
          type: 'polygon',
          coordinates: [createParcelPointDto.coordinates],
          //City_Name: createParcelPointDto.City_Name
        }
        console.log(Polygon)
        // const parcel = this.parcel.create({ polygon })
        const parcel = this.polyRepository.create({  polygon })
        console.log(parcel)
        await this.polyRepository.save(parcel)
        return parcel
      }
      findAllPolygon() {
        return this.polyRepository.find()
      }


    }