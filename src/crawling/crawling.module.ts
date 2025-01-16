import { Module } from '@nestjs/common';
import { PagingService } from './paging.service';
import { CrawlingService } from './crawling.service';
import { CrawlingController } from './crawling.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    CrawlingService,
    PagingService,
  ],
  exports: [CrawlingService],
  controllers: [CrawlingController],
})
export class CrawlingModule {}
