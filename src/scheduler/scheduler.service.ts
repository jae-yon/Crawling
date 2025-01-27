import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CrawlingService } from 'src/crawling/crawling.service';
import { CrawlingRepository } from 'src/crawling/crawling.repository';

@Injectable()
export class SchedulerService {
  constructor(
    private readonly logger: Logger,
    private readonly crawlingService: CrawlingService,
    private readonly crawlingRepository: CrawlingRepository,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_2PM)
  async startCrawling() {
    this.logger.debug(`Scheduler service has been activated`);
    await this.crawlingRepository.deleteCrawledNewsByMongoose();
    await this.crawlingService.crawling();
  }
}