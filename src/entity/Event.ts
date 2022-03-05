import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from './User';

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    title: string

    @Column({nullable: true})
    notes:string

    @Column()
    start: Date

    @Column()
    end: Date

    @ManyToOne(type => User , user => user.event)
    @JoinColumn()
    user: User

}
