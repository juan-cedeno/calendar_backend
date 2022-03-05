import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from './Event';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({nullable: false})
    email: string

    @Column()
    password: string

    @OneToMany(type => Event , event => event.user )
    @JoinColumn()
    event: Event[]

}