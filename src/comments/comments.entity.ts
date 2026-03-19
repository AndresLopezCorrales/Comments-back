import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column()
  date: Date;

  // eager: true carga el usuario automáticamente en cada find()
  @ManyToOne(() => User, (user) => user.comments, { eager: true })
  user: User;
}