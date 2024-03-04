import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Film } from "./FilmE";

export interface ActorI {
    id?: number,
    name: string,
}

@Entity()
export class Actor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 1024 })
    name: string;

    @ManyToMany(() => Film)
    @JoinTable()
    films: Film[];
}