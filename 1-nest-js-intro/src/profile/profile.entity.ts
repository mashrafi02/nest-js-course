import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Profile {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true
    })
    first_name: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true
    })
    last_name: string;

    @Column({
        type: 'int',
        nullable: true
    })
    age: number;

    @Column({ nullable: true })
    gender: string;

    @Column({
        type: 'timestamp',
        nullable: true
    })
    dateOfBirth: Date;

    @Column({
        type: 'text',
        nullable: true
    })
    bio: string;
    
    @Column({
        type:'text',
        nullable: true
    })
    avatarUrl: string;
}