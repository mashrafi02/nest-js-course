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


    // for unidirectional many to many relation ship, when the owning side is deleted, the related row in the junction table will also be deleted automatically. we do not need to cascade delete operation manually. but if we want to keep the related row in the junction table, we can set the onDelete option to 'SET NULL' or 'NO ACTION'.
    @ManyToMany(() => Hashtag, hashtag => hashtag.messages)
    @JoinTable()
    hashtags?: Hashtag[];
}