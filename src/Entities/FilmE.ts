import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";

import { Actor, ActorI } from "./ActorE";

export interface FilmI {
    id?: number,
    name: string,
}

export interface FilmActorsInfoI {
    id?: number,
    name: string,
    actors: ActorI[],
}

@Entity()
export class Film {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, length: 255 })
    name: string;

    @ManyToMany(() => Actor)
    @JoinTable()
    actors: Actor[];
}