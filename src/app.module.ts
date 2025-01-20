import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrismaModule } from 'prisma/prisma.module';
import { CrawlingModule } from './crawling/crawling.module';
import { SchedulerModule } from './scheduler/scheduler.module';

@Module({
  imports: [
    PrismaModule,
    CrawlingModule,
    SchedulerModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
  ],
})

export class AppModule {}
