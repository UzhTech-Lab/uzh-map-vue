import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Community } from '../community/community.entity';

@Entity()
export class Population {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => Community, (community) => community.population, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'community_id' })
  community: Community;

  @Column({ nullable: true })
  amount: number;

  @Column({ nullable: true })
  preschool_age: number;

  @Column({ nullable: true })
  school_age: number;

  @Column({ nullable: true })
  working_age: number;

  @Column({ nullable: true })
  retired: number;

  @Column({ nullable: true })
  voters: number;

  @Column('jsonb')
  nationalities: { nationality_name: string; percent: number }[];
}
