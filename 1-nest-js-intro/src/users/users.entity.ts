import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    first_name: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    last_name: string;

    @Column({
        type: 'int',
        nullable: false
    })
    age: number;

    @Column({ nullable: true })
    gender?: string;

    @Column({
        type: 'varchar',
        unique: true,
        nullable: false
    })
    email: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    password: string;
}