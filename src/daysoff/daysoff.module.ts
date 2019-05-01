import { Module } from '@nestjs/common';
import { DaysoffController } from './daysoff.controller';
import { DaysoffService } from './daysoff.service';
import { DaysoffEntity } from './daysoff.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DaysoffEntity, User])],
  controllers: [DaysoffController],
  providers: [DaysoffService],
})
export class DaysoffModule {
}
