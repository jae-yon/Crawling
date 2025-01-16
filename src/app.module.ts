import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { CrawlingModule } from './crawling/crawling.module';


@Module({
  imports: [
    PrismaModule,
    CrawlingModule,
  ],
})

export class AppModule {}
