import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class RequestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('datetime')
  dateStart: Date;

  @Column('datetime')
  dateEnd: Date;

  @Column()
  isApproved: boolean;

  @Column()
  state: string;

  @Column()
  reason: string;

  @ManyToOne(type => User, user => user.requests)
  user: User;
}
