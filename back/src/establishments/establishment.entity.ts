import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { LoyaltyCard } from '../loyalty-cards/loyalty-card.entity';

@Entity('establishments')
export class Establishment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ default: 10 })
  visitsRequired: number;

  @Column()
  rewardDescription: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => LoyaltyCard, (card) => card.establishment)
  loyaltyCards: LoyaltyCard[];
}
