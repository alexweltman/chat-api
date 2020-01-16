import { Entity, JoinColumn, ManyToOne } from "typeorm";
import User from './User';
import BaseEntity from './BaseEntity';

@Entity('conversations')
export default class Conversation extends BaseEntity {
  @ManyToOne(type => User)
  @JoinColumn()
  firstUser!: User;

  @ManyToOne(type => User)
  @JoinColumn()
  secondUser!: User;
}
