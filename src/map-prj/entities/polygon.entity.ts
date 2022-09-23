/* eslint-disable prettier/prettier */
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { Polygon } from "geojson";
import { IsOptional } from "nestjs-class-validator";

// @Entity({ name: 'polygon' })
@Entity('polygon')
export class poly {

    @PrimaryGeneratedColumn()
    id:number

    @Index({ spatial: true })
    @Column({
        type: 'geography',
        spatialFeatureType: 'Polygon',
        srid:4326,
        nullable: true
    })
    polygon: Polygon

    @IsOptional()
    coordinates:number[][] ;
}