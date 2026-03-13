import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('activities')
export class Activity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 500 })
  description!: string;

  @Column({ type: 'varchar', length: 100 })
  type!: string;

  @Column({ type: 'int', nullable: true })
  userId!: number | null;

  @CreateDateColumn()
  createdAt!: Date;
}
