import { Column, DeleteDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from '../message/message.entity';

@Entity()
export class Hashtag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  name: string;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToMany(() => Message, (message) => message.hashtags, {
    onDelete: 'CASCADE',
  })
  messages?: Message[]
}