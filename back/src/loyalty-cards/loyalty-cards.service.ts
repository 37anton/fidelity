import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoyaltyCard } from './loyalty-card.entity';

@Injectable()
export class LoyaltyCardsService {
  constructor(
    @InjectRepository(LoyaltyCard)
    private readonly repo: Repository<LoyaltyCard>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['user', 'establishment'] });
  }

  findByUser(userId: string) {
    return this.repo.find({
      where: { user: { id: userId } },
      relations: ['establishment'],
    });
  }

  async findOne(id: string) {
    const card = await this.repo.findOne({
      where: { id },
      relations: ['user', 'establishment'],
    });
    if (!card) throw new NotFoundException(`LoyaltyCard ${id} not found`);
    return card;
  }

  create(data: Partial<LoyaltyCard>) {
    return this.repo.save(this.repo.create(data));
  }

  async recordVisit(id: string) {
    const card = await this.findOne(id);
    card.visits += 1;
    card.points += 50;
    return this.repo.save(card);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.repo.delete(id);
  }
}
