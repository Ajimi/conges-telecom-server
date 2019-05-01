import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DaysoffEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('datetime')
  dateStart: Date;

  @Column('datetime')
  dateEnd: Date;

}
