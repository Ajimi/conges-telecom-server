import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RequestEntity } from '../request/request.entity';
import { ManyToOne } from 'typeorm/decorator/relations/ManyToOne';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 100, nullable: true })
  password: string | undefined;

  @Column({ length: 10, nullable: true })
  role: string | undefined;

  @Column({ length: 100, nullable: true })
  passwordHash: string | undefined;

  @Column({ length: 500 })
  email: string;

  @OneToMany(type => RequestEntity, request => request.user)
  requests: RequestEntity[];

  @ManyToOne(type => User)
  superviosr: User;

  @ManyToOne(type => User)
  humanResource: User;
}
