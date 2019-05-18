import { Body, Controller, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { RequestService } from './request.service';

@Controller('requests')
export class RequestController {

  constructor(private readonly requestService: RequestService) {
  }

  @Post()
  async create(@Body() data) {
    return await this.requestService.create(data.userId, data);
  }

  @Get()
  async showAll() {
    return await this.requestService.showAll();
  }

  @Get(':id')
  async show(@Param('id') id) {
    return await this.requestService.show(id);
  }

  @Get(':id/:type')
  async findAllByUserId(@Param('id') id, @Param('type') type) {
    if (type === 'user') {
      return await this.requestService.showAllByUser(id);
    } else if (type === 'supervisor') {
      return await this.requestService.showRequestsBySupervisor(id);
    } else { // Human Resources
      Logger.log('Hello');
      return await this.requestService.showRequestsByHumanResources(id);
    }
  }

  @Put(':id')
  async updateApproval(@Param('id') id, @Body() data) {
    return await this.requestService.updateApproval(id, data);
  }

  @Put('confirm/:id')
  async confirmRequest(@Param('id') id, @Body() data) {
    return this.requestService.updateRequest(id, { isApproved: true }, false);
  }

  @Put('accept/:id')
  async acceptRequest(@Param('id') id, @Body() data) {
    return this.requestService.updateRequest(id, { state: 'ACCEPTED', isApproved: true }, true);
  }

  @Put('refuse/:id')
  async refuseRequest(@Param('id') id, @Body() data) {
    return await this.requestService.updateApproval(id, { state: 'REFUSED', isApproved: false });
  }
}
