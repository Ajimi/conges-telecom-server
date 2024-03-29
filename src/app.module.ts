import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RequestModule } from './request/request.module';
import { DaysoffModule } from './daysoff/daysoff.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    AuthModule,
    RequestModule,
    DaysoffModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
