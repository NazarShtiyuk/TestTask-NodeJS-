import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    realName: string;

    @Column( { unique: true } )
    email: string;

    @Column( { unique: true} )
    login: string;

    @Column()
    password: string;

    @Column()
    birthDate: Date;

    @Column()
    country: string;
}