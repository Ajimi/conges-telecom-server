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
    return await this.requestRepository.find({
      relations: ['user'],
    });
  }

  async show(id) {
    return await this.requestRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async showAllByUser(id) {
    return await this.userRepository.find({
      where: { id },
      relations: ['requests'],
    });
  }

  async showRequestsBySupervisor(id) {
    return await this.userRepository.find({
      where: { supervisor: { id } },
      relations: ['requests'],
    });
  }

  async showRequestsByHumanResources(id) {
    return await this.userRepository.find({
      where: { humanResource: { id } },
      relations: ['requests'],
    });
  }

  async updateApproval(id, data) {
    const request = await this.requestRepository.update(id, data);
    return await this.requestRepository.findOne(id);
  }

  async acceptRequest(id, data) {
    await this.requestRepository.update(id, data);
    const request = await this.requestRepository.findOne(id, {
      relations: ['user'],
    });
    // this.userRepository.update()
  }
}
