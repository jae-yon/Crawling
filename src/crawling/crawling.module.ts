import { Module } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { CrawlingService } from './crawling.service';
import { CrawlingController } from './crawling.controller';
import { CrawlingRepository } from './crawling.repository';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    CrawlerService,
    CrawlingService,
    CrawlingRepository,
  ],
  exports: [CrawlingService],
  controllers: [CrawlingController],
})
export class CrawlingModule {}
