import { Entity, JoinColumn, ManyToOne, Column } from "typeorm";
import User from './User';
import BaseEntity from './BaseEntity';

@Entity('conversations')
export default class Conversation extends BaseEntity {
  @ManyToOne(type => User)
  @JoinColumn()
  firstUser?: User;

  @Column()
  firstUserId!: number;

  @ManyToOne(type => User)
  @JoinColumn()
  secondUser?: User;

  @Column()
  secondUserId!: number;
}

