import { Categories } from 'src/assets/enums/education-categories-enums';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Community } from '../community/community.entity';

@Entity()
export class Education {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  hospitals: number;

  @Column({ nullable: true })
  schools: number;

  @Column({ nullable: true })
  universities: number;

  @Column({ nullable: true })
  libraries: number;

  @Column({ nullable: true })
  theaters: number;

  @Column({ type: 'enum', enum: Categories })
  category: Categories;

  @ManyToOne(() => Community, (community) => community.education_places, {
    onDelete: 'CASCADE',
  })
  community: Community;
}
