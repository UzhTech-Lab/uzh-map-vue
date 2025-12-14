import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Community } from '../community/community.entity';

@Entity()
export class Economy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  industries: number;

  @Column({ nullable: true })
  companies: number;

  @Column({ nullable: true })
  unemployment: number;

  @Column({ nullable: true })
  majorEmployers: number;

  @Column('float', { nullable: true })
  budget: number | null;

  @Column('float', { nullable: true })
  industry_amount: number | null;

  @Column('float', { nullable: true })
  trade_amount: number | null;

  @Column('float', { nullable: true })
  enterprises_amount: number | null;

  @OneToOne(() => Community, (community) => community.economy, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'community_id' })
  community: Community;
}
