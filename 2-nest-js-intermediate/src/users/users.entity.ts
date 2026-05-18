import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Profile } from "../profile/profile.entity";
import { Message } from "../message/message.entity";


@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type: 'varchar',
        length: 24,
        unique: true,
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

    @OneToOne(() => Profile,
                 (profile) => profile.user, 
                 {
                    cascade: ['insert', 'remove'],
                    // eager: true     ---> this will query all the relations
                })
    @JoinColumn()
    profile?: Profile;

    @OneToMany(() => Message, (message) => message.user)
    messages?: Message[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}