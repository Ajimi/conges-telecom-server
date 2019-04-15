import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { RequestEntity } from './request.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestEntity, User])],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {
}
