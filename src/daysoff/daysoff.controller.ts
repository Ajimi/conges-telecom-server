import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DaysoffService } from './daysoff.service';

@Controller('daysoff')
export class DaysoffController {

  constructor(private readonly daysOffService: DaysoffService) {
  }

  @Post()
  async create(@Body() data) {
    return await this.daysOffService.createDayOff(data);
  }

  @Get()
  async showAll() {
    return await this.daysOffService.showAll();
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    return await this.daysOffService.delete(id);
  }
}
