import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrismaModule } from 'prisma/prisma.module';
import { UtilService } from './util.service';
import { CrawlerService } from './crawler.service';
import { CrawlingService } from './crawling.service';
import { CrawlingController } from './crawling.controller';
import { CrawlingRepository } from './crawling.repository';
import { CrawledNews, CrawledNewsSchema } from './schemas/crawling.schema';

@Module({
  imports: [
    PrismaModule,
    MongooseModule.forFeature([{ name: CrawledNews.name, schema: CrawledNewsSchema }]),
  ],
  providers: [
    UtilService,
    CrawlerService,
    CrawlingService,
    CrawlingRepository,
  ],
  exports: [CrawlingService],
  controllers: [CrawlingController],
})
export class CrawlingModule {}
