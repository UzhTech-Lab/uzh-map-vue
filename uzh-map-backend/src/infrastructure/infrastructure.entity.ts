import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Community } from '../community/community.entity';

@Entity()
export class Infrastructure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roads: boolean;

  @Column()
  railway: boolean;

  @Column()
  busses: boolean;

  @Column()
  stations: number;

  @Column({ nullable: true })
  markets: number;

  @Column({ nullable: true })
  shoppingCenters: number;

  @Column({ nullable: true })
  supermarkets: number;

  @Column({ nullable: true })
  restaurants: number;

  @Column({ nullable: true })
  cafes: number;

  @Column({ nullable: true })
  hotels: number;

  @OneToOne(() => Community, (community) => community.infrastructure, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'community_id' })
  community: Community;
}
