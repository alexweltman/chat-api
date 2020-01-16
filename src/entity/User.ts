import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

import BaseEntity from './BaseEntity';

@Entity('users')
export default class User extends BaseEntity {
  @Column()
  firstName!: string;

  @Column()
  lastName!: string;
}
