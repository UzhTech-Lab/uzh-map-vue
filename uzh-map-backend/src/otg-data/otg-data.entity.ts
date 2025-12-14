import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('otg_data')
export class OtgData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  region: string;

  @Column('decimal', { precision: 10, scale: 2 })
  area_km2: number;

  @Column('int')
  population: number;

  @Column('int')
  settlements: number;

  @Column('int')
  established: number;

  @Column('jsonb')
  center: {
    latitude: number;
    longitude: number;
  };

  @Column('jsonb')
  polygon: number[][];

  @Column()
  color: string;

  @Column('jsonb')
  highlights: string[];

  @Column('jsonb')
  keyPlaces: any[];

  @Column('text')
  history: string;

  @Column('text')
  geography: string;

  @Column('jsonb', { nullable: true })
  demographics: any;

  @Column('jsonb', { nullable: true })
  economy: any;

  @Column('jsonb', { nullable: true })
  transport: any;

  @Column('jsonb', { nullable: true })
  agriculture: any;

  @Column('jsonb', { nullable: true })
  trade: any;

  @Column('jsonb', { nullable: true })
  humanitarian: any;

  @Column('jsonb', { nullable: true })
  religion: any;

  @Column('jsonb', { nullable: true })
  sports: any;
}
