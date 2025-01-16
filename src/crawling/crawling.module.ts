import { Module } from '@nestjs/common';
import { CrawlingService } from './crawling.service';
import { CrawlingController } from './crawling.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CrawlingService],
  exports: [CrawlingService],
  controllers: [CrawlingController],
})
export class CrawlingModule {}
