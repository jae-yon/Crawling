import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { PrismaModule } from 'prisma/prisma.module';
import { CrawlingModule } from './crawling/crawling.module';

@Module({
  imports: [
    PrismaModule,
    CrawlingModule,
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
  ],
})

export class AppModule {}
