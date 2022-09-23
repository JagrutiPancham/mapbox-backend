/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, Index } from "typeorm";
import {Point } from 'geojson';
@Entity('Geolocation')
export class MapEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column({ type: 'decimal', default: null })
    lat:number

    @Column({type: 'decimal', default: null})
    lon:number

    @Column({nullable:true})
    name:string

    @Column({nullable:true})
    City_Name:string

    @Index({spatial:true})
    @Column({ type: 'geography',spatialFeatureType:'Point', srid: 4326, nullable: true})
    Point:Point
}