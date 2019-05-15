import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RequestEntity } from '../request/request.entity';
import { ManyToOne } from 'typeorm/decorator/relations/ManyToOne';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: true })
  firstname: string;

  @Column({ length: 50, nullable: true })
  lastname: string;

  @Column({ length: 50, nullable: true })
  cin: string;

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

  @Column('int')
  solde: number;

  @Column('int')
  consumedSolde: number;

  @Column('datetime')
  registerDate: Date;

  @OneToMany(type => RequestEntity, request => request.user)
  requests: RequestEntity[];

  @ManyToOne(type => User)
  supervisor: User;

  @ManyToOne(type => User)
  humanResource: User;
}
