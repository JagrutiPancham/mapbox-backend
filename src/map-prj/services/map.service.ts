/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateMapDto } from '../dto/create-map.dto';
import { UpdateMapDto } from '../dto/update-map.dto';
import { MapEntity } from '../entities/map.entity';


@Injectable()
export class MapService {
    constructor(
        @InjectRepository(MapEntity)
        private readonly mapRepository: Repository<MapEntity>
    ){}
    create(createmapdto: CreateMapDto):Observable<CreateMapDto>{
        //throw new Error('Method not implemented.');
        return from(this.mapRepository.save(createmapdto))
    }
   

    

  
    // createPost(map: MapInterface): Observable<MapInterface>{
    //     return from(this.mapRepository.save(map));
    // }

    findAllPosts(){
        return from(this.mapRepository.find());
    }

   
    //somefeilds updation
    updatedetails(id: number,updatemapdto: UpdateMapDto) {
        return `This action updates a #${id} MapEntity`;
      }

    
    updatePost(id: number, updatemapdto:UpdateMapDto){
        return `This action removes a #${id} MapEntity`;
    }

// findById(id: number):Observable<MapInterface>{
    //     return from(this.mapRepository.findOneBy({id}));
    // }
//     deletePost(id: number): Observable<DeleteResult>{
//         return from(this.mapRepository.delete(id));
//     }
}
