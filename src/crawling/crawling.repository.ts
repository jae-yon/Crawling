import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CrawledNews as prismaEntity, Prisma } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";
import { CrawledNews as mongooseEntity } from "./schemas/crawling.schema";
import { Model } from "mongoose";

@Injectable()
export class CrawlingRepository {
  constructor(
    @InjectModel(mongooseEntity.name) private readonly crawledNews: Model<mongooseEntity>,
    private prisma: PrismaService,
  ) {}

  private readonly logger = new Logger(CrawlingRepository.name);

  async createCrawledNewsByMongoose(dataArray: mongooseEntity[]): Promise<mongooseEntity[]> {
    const result: mongooseEntity[] = [];
    try {
      this.logger.log(`Create ${dataArray.length} item to the database by mongoose`);
      for (const data of dataArray) {
        await this.crawledNews.findOneAndUpdate(
          { link: data.link },
          { $setOnInsert: data },
          { upsert: true, new: false }
        );
        result.push(data);
      }
      return result;
    } catch (error) {
      this.logger.error(`Failed to create data: ${error.message}`);
      throw error;
    }
  }

  async createCrawledNewsByPrisma(dataArray: Prisma.CrawledNewsCreateInput[]): Promise<prismaEntity[]> {
    try {
      this.logger.log(`Create ${dataArray.length} item to the database by prisma`);
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

  async getCrawledNewsByPrisma(): Promise<prismaEntity[]> {
    try {
      this.logger.log(`Fetching all data from the database by prisma`);
      return await this.prisma.crawledNews.findMany();
    } catch (error) {
      this.logger.error(`Failed to fetch data: ${error.message}`);
      throw error;
    }
  }
}