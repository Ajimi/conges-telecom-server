import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DaysoffEntity } from './daysoff.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DaysoffService {
  constructor(
    @InjectRepository(DaysoffEntity) private readonly daysoffRepository: Repository<DaysoffEntity>,
  ) {
  }

  async createDayOff(data: any) {
    const daysOff = await this.daysoffRepository.create(data);
    await this.daysoffRepository.save(daysOff);
    return daysOff;
  }

  async showAll() {
    return await this.daysoffRepository.find();
  }

  async delete(id) {
    return await this.daysoffRepository.delete({ id });
  }
}
