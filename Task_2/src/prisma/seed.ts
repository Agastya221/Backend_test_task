import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = Array.from({ length: 1000000 }, (_, i) => ({
    firstName: `FirstName${i}`,
    lastName: `LastName${i}`,
    age: Math.floor(Math.random() * 100),
    gender: Math.random() > 0.5 ? 'Male' : 'Female',
    issues: Math.random() > 0.5,
  }));

  const chunkSize = 10000;
  for (let i = 0; i < users.length; i += chunkSize) {
    await prisma.user.createMany({
      data: users.slice(i, i + chunkSize),
    });
    console.log(`Inserted ${i + chunkSize} users`);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
