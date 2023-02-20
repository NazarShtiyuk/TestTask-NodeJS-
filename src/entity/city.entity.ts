import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import 'reflect-metadata';

@Entity({ name: 'cities' })
export class City {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
}