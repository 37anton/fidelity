import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoyaltyCard } from './loyalty-card.entity';
import { LoyaltyCardsController } from './loyalty-cards.controller';
import { LoyaltyCardsService } from './loyalty-cards.service';

@Module({
  imports: [TypeOrmModule.forFeature([LoyaltyCard])],
  controllers: [LoyaltyCardsController],
  providers: [LoyaltyCardsService],
  exports: [LoyaltyCardsService],
})
export class LoyaltyCardsModule {}
