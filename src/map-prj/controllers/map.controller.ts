/* eslint-disable prettier/prettier */
import {  Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { readFileSync } from 'fs';
import { diskStorage } from 'multer';
import { parse } from 'papaparse';
import { extname } from 'path';
import {Point} from 'geojson';
import { last, Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { MapService } from '../services/map.service';


@Controller('map')
export class MapController {
  filepath:any;
constructor(private readonly mapService: MapService) {}
 //to get all details path http://localhost:3001/map/details

 @Get('/details')
  findPost(){
    return this.mapService.findAllPosts();
}

//<-------Api to upload files --------->
@Post('upload')
    @UseInterceptors(
        FileInterceptor('file',{
            storage: diskStorage({
                destination: './Downloads',
                filename:(req,file,callback)=>{
                  const uniqueSuffix =
                  Date.now()+ '-' + Math.round(Math.random()*1e9);
                  const fileExtName =extname(file.originalname);
                  const filename = `${uniqueSuffix}${fileExtName}`;
                  callback(null,filename);
                }
            }),
            fileFilter:(req,file,callback)=>{
              if(!file.originalname.match(/\.(csv)$/)){
                return callback(new Error('Only CSV files are allowed!'),false);
              } callback(null,true)
            }
        }),
    )
async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const csvFile = readFileSync(`Downloads/${file.originalname}`);
    const csvData = csvFile.toString();

    const parsedCsv = await parse(csvData, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.toLowerCase().replace('#', '').trim(),
        complete: (results) => results.data,
      });
      console.log(parsedCsv.data[0]);
      parsedCsv.data.forEach((element) => {
        const Point: Point = {
          type: 'Point',
          coordinates: [element.lat, element.lon],
        };
        const loadData = {
          
          lat: element.lat,
          lon: element.lon,
          City_Name: element.City_Name,
          Point: Point,
        };
        console.log(loadData);
        this.mapService.create(loadData);
        const response = {
          message: 'File uploaded successfully!',
          data: {
            originalname: file.originalname,
          },
        };
        return response;
      });
    }
//<----Put----->

// @Put('/details/:id')
// update(
//   @Param(
//     'id'
//   )
//   id: number,
//   @Body() map: MapInterface,
// ): Observable<UpdateResult> {
//   return this.mapService.updatePost(id, map);
// }

 //   @Post('/details')
//   create(@Body() view: MapInterface): Observable<MapInterface> {
//     return this.mapService.createPost(view);
//   }

//   @Delete('details/:id')
//   delete(
//     @Param('id'
//     )
//     id: number,
//   ): Observable<DeleteResult> {
//     return this.mapService.deletePost(id);
//   }

// @Patch('update/:id')
// updatedetails(
//   @Param('id') id: number,
//   @Body() updatemapdto: updateMapDto,
// ) {
//   return this.mapService.updatedetails(id, updatemapdto);
// }

}