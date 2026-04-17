import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Establishment } from '../establishments/establishment.entity';

@Entity('loyalty_cards')
export class LoyaltyCard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.loyaltyCards, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Establishment, (e) => e.loyaltyCards, { onDelete: 'CASCADE' })
  establishment: Establishment;

  @Column({ default: 0 })
  visits: number;

  @Column({ default: 0 })
  points: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
