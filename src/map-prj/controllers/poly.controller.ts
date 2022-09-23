/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { poly } from '../entities/polygon.entity';
import { PolyService } from '../services/poly.service';


@Controller('poly')
export class PolyController {
    constructor(private polyService: PolyService) {}

    @Post('details')
    async createParcelPoint(
      @Body()
      createParcelPointDto: poly): Promise<poly> {
      console.log(createParcelPointDto)
      return this.polyService.createpoly(createParcelPointDto)
    }
    @Get("details")
    polygon() {
      return this.polyService.findAllPolygon();
    }
 
}