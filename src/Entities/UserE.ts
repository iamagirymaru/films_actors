import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

export interface UserI {
    id?: number,
    username: string,
    email: string,
    password?: string,
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
}