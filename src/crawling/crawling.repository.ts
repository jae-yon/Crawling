import { Injectable, Logger } from "@nestjs/common";
import { CrawledNews, Prisma } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";

@Injectable()
export class CrawlingRepository {
  constructor(
    private prisma: PrismaService,
  ) {}

  private readonly logger = new Logger(CrawlingRepository.name);

  async createCrawledNewsByPrisma(dataArray: Prisma.CrawledNewsCreateInput[]): Promise<CrawledNews[]> {
    try {
      this.logger.log(`Create ${dataArray.length} item to the CrawledNews`);
      return await this.prisma.$transaction(
        dataArray.map((data) =>
          this.prisma.crawledNews.upsert({
            where: { link: data.link },
            create: data,
            update: {},
          }),
        ),
      );
    } catch (error) {
      this.logger.error(`Failed to create data: ${error.message}`);
      throw error;
    }
  }

  async getCrawledNewsByPrisma(): Promise<CrawledNews[]> {
    try {
      this.logger.log(`Fetching all data from the CrawledNews`);
      return await this.prisma.crawledNews.findMany();
    } catch (error) {
      this.logger.error(`Failed to fetch data: ${error.message}`);
      throw error;
    }
  }
}