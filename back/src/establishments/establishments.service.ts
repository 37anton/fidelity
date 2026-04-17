import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Establishment } from './establishment.entity';

@Injectable()
export class EstablishmentsService {
  constructor(
    @InjectRepository(Establishment)
    private readonly repo: Repository<Establishment>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException(`Establishment ${id} not found`);
    return entity;
  }

  create(data: Partial<Establishment>) {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: string, data: Partial<Establishment>) {
    await this.findOne(id);
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.repo.delete(id);
  }
}
