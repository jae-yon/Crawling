import { Controller, Get } from '@nestjs/common';
import { CrawlingService } from './crawling.service';

@Controller('crawling')
export class CrawlingController {
  constructor(private readonly crawlingService: CrawlingService) {}

  @Get()
  async getNaverNews(): Promise<any> {
    return await this.crawlingService.crawlNaverNews();
  }
}