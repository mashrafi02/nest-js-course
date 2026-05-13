import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Users } from "../users/users.entity";
import { Hashtag } from "../hashtag/hashtag.entity";


@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'text',
        nullable: false,
    })
    text: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    image?: string;

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Users, (user) => user.messages)
    user: Users

    @ManyToMany(() => Hashtag)
    @JoinTable()
    hashtags?: Hashtag[];
}