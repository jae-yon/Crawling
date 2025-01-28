import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PrismaModule } from 'prisma/prisma.module';
import { CrawlingModule } from './crawling/crawling.module';
import { SchedulerModule } from './scheduler/scheduler.module';

@Module({
  imports: [
    PrismaModule,
    CrawlingModule,
    SchedulerModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
  ],
  providers: [AppService],
  controllers: [AppController],
})

export class AppModule {}
