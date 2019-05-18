import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestEntity } from './request.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { RequestDTO } from './dto/request.dto';
import moment = require('moment');

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(RequestEntity) private readonly requestRepository: Repository<RequestEntity>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
  }

  numberOfDays(start: Date, end: Date) {
    return moment(end).diff(moment(start), 'days');
  }

  canAddRequest(totalDays, restedSoldeDays) {
    return restedSoldeDays >= totalDays;
  }

  async create(userId, data: RequestDTO) {
    const employee = await this.userRepository.findOne({ where: { id: userId } });

    const restedSolde = employee.solde - employee.consumedSolde;
    const totalDaysRequested = this.numberOfDays(data.dateStart, data.dateEnd);
    if (this.canAddRequest(totalDaysRequested + 1, restedSolde)) {
      const request = await this.requestRepository.create({ ...data, user: employee });
      await this.requestRepository.save(request);
      return request;
    } else {
      throw new HttpException(restedSolde + '', HttpStatus.NOT_ACCEPTABLE);
    }
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
      // where: { id: { id} },
      relations: ['requests'],
    });
  }

  async updateApproval(id, data) {
    const request = await this.requestRepository.update(id, data);
    return await this.requestRepository.findOne(id, {
      relations: ['user'],
    });
  }

  async updateRequest(id, data, shouldAccept) {
    const request = await this.requestRepository.findOne(id, {
      relations: ['user'],
    });
    const restedSolde = request.user.solde - request.user.consumedSolde;
    const totalDays = this.numberOfDays(request.dateStart, request.dateEnd);
    Logger.log(totalDays + '');
    if (this.canAddRequest(totalDays + 1, restedSolde)) {
      await this.requestRepository.update(id, data);
      if (shouldAccept) {
        request.user.consumedSolde += totalDays + 1;
        await this.userRepository.save(request.user);
      }
      return request;
    } else {
      throw new HttpException(restedSolde + '', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
