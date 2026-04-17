import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { LoyaltyCardsService } from './loyalty-cards.service';

@Controller('loyalty-cards')
export class LoyaltyCardsController {
  constructor(private readonly service: LoyaltyCardsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.service.findByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Post(':id/visit')
  recordVisit(@Param('id') id: string) {
    return this.service.recordVisit(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
