import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RequestService } from './request.service';

@Controller('requests')
export class RequestController {

  constructor(private readonly articleService: RequestService) {
  }

  @Post()
  async create(@Body() data) {
    return this.articleService.create(data.userId, data);
  }

  @Get()
  async showAll() {
    return this.articleService.showAll();
  }

  @Get(':id')
  async show(@Param('id') id) {
    return this.articleService.show(id);
  }

  @Get(':id/user')
  async findAllByUserId(@Param('id') userId) {
    return this.articleService.showAllByUser(userId);
  }

  @Put(':id')
  async updateApproval(@Param('id') id, @Body() data) {
    return this.articleService.updateApproval(id, data);
  }
}
