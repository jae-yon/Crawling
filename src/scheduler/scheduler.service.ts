import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CrawlingService } from 'src/crawling/crawling.service';
import { CrawlingRepository } from 'src/crawling/crawling.repository';

@Injectable()
export class SchedulerService {
  constructor(
    private readonly crawlingService: CrawlingService,
    private readonly crawlingRepository: CrawlingRepository,
  ) {}
  private readonly logger = new Logger(SchedulerService.name);

  @Cron(CronExpression.EVERY_10_SECONDS)
  async getCrawledNews() {
    const news = await this.crawlingRepository.getLatestCrawledNewsByMongoose();
    this.logger.debug(`Get latest crawled news data:\n${news}`);
  }

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  async startCrawling() {
    this.logger.debug(`The crawling service has been activated`);
    await this.crawlingService.crawling();
  }
}
