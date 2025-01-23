import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CrawledNews as prismaEntity, Prisma } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";
import { CrawledNews as mongooseEntity } from "./schemas/crawling.schema";
import { Model } from "mongoose";
import dayjs from "dayjs";

@Injectable()
export class CrawlingRepository {
  constructor(
    @InjectModel(mongooseEntity.name) private readonly crawledNews: Model<mongooseEntity>,
    private prisma: PrismaService,
  ) {}

  private readonly logger = new Logger(CrawlingRepository.name);

  async getLatestCrawledNewsByMongoose(): Promise<mongooseEntity> {
    return await this.crawledNews.findOne().sort({ createdAt: -1 });
  }

  async createCrawledNewsByMongoose(dataArray: mongooseEntity[]): Promise<mongooseEntity[]> {
    const result: mongooseEntity[] = [];
    try {
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

  async deleteCrawledNewsByMongoose(): Promise<number> {
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - 30);
    try {
      const result = await this.crawledNews.deleteMany({ createdAt: { $lt: daysAgo } });
      return result.deletedCount || 0;
    } catch (error) {
      this.logger.error(`Failed to delete data: ${error.message}`);
      throw error;
    }
  }

  async getCrawledNewsByMongoose(dateStart: string, dateEnd: string): Promise<mongooseEntity[]> {
    const startDate = dayjs(dateStart).format('YYYY-MM-DD');
    const endDate = dayjs(dateEnd).format('YYYY-MM-DD');
    try {
      return await this.crawledNews.find({ createdAt: { $gte: startDate, $lte: endDate },}).lean().exec();
    } catch (error) {
      this.logger.error(`Failed to fetch data: ${error.message}`);
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