import { Entity, JoinColumn, ManyToOne, Column } from "typeorm";
import User from './User';
import Conversation from './Conversation';
import BaseEntity from './BaseEntity';

@Entity('messages')
export default class Message extends BaseEntity {
  @Column({ type: 'text' })
  content!: string;

  @ManyToOne(type => User)
  @JoinColumn()
  sender!: User;

  @ManyToOne(type => Conversation)
  @JoinColumn()
  conversation!: Conversation;
}
