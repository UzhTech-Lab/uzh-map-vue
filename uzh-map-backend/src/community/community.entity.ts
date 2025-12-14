import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Geography } from '../geography/geography.entity';
import { Economy } from '../economy/economy.entity';
import { Infrastructure } from '../infrastructure/infrastructure.entity';
import { Agriculture } from '../argiculture/agriculture.entity';
import { Education } from '../education/education.entity';
import { Population } from '../population/population.entity';

export class Center {
  latitude: number;
  longitude: number;
}

@Entity()
export class Community {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  edrpou_code: string;

  @Column()
  region: string;

  @Column({ nullable: true })
  population_amount: number;

  @Column({ nullable: true })
  established: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  area_km2: number;

  @Column()
  district: string;

  @Column()
  center_settlement: string;

  @Column({ type: 'jsonb', nullable: true })
  center: Center;

  @Column()
  geography_description: string;

  @Column('jsonb', { nullable: true })
  coordinates: number[][][];

  @Column('text', { array: true, nullable: true })
  keyPlaces: string[];

  @Column()
  postal_index: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  website?: string;

  @Column('text', { array: true })
  photos?: string[];

  @Column()
  history: string;

  @Column('text', { array: true })
  settlements: string[];

  @OneToMany(() => Geography, (geography) => geography.community)
  geography: Geography;

  @OneToOne(() => Population, (population) => population.community)
  population: Population;

  @OneToOne(() => Economy, (economy) => economy.community)
  economy: Economy;

  @OneToOne(() => Infrastructure, (infrastructure) => infrastructure.community)
  infrastructure: Infrastructure;

  @OneToMany(() => Agriculture, (argiculture) => argiculture.community)
  argiculture_places: Agriculture[];

  @OneToMany(() => Education, (education) => education.community)
  education_places: Education[];
}
