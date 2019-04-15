import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';
import { RequestEntity } from '../request/request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, RequestEntity])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {
}
