import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestEntity } from './request.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { RequestDTO } from './dto/request.dto';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(RequestEntity) private readonly requestRepository: Repository<RequestEntity>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
  }

  async create(userId, data: RequestDTO) {
    const employee = await this.userRepository.findOne({ where: { id: userId } });
    const request = await this.requestRepository.create({ ...data, user: employee });
    await this.requestRepository.save(request);
    return request;
  }

  async showAll() {
    return await this.requestRepository.find();
  }

  async showAllByUser(userId: any) {
    return await this.requestRepository.find({
      where: { user: { id: userId } },
    });
  }

  async show(id) {
    return await this.requestRepository.findOne(id);
  }

  async updateApproval(id: any, data) {
    const request = await this.requestRepository.update({ id }, data);
    return await this.requestRepository.findOne(id);
  }
}
