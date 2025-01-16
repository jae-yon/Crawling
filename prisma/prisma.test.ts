import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function generateNews() {
  return {
    regionCode: 'KR',
    title: faker.lorem.sentence(),
    link: faker.internet.url(),
    source: faker.company.name(),
    category: [faker.word.noun(), faker.word.noun()],
    publishedAt: faker.date.recent().toISOString(),
    images: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => faker.image.url()),
    content: faker.lorem.paragraphs(2),
  };
}

async function main() {
  try {
    const createData = await Promise.all(
      Array.from({ length: 3 }, async () => await generateNews())
    );

    await prisma.$transaction(
      createData.map((data) => prisma.crawledNews.upsert({
        where: { link: data.link },
        create: data,
        update: {},
      }))
    );
  
    console.log(await prisma.crawledNews.findMany());
  } catch (error) {
    console.log(`Error: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

main();