import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type: 'varchar',
        length: 24,
        nullable: false
    })
    username: string;

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

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}