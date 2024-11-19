import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanUpDatabase() {
  try {
    console.log('Starting cleanup...');

    // Delete all records 
    await prisma.user.deleteMany();

    // Reset the sequence for auto-increment 
    await prisma.$executeRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`;

    console.log('All records deleted and auto-increment ID reset successfully!');
  } catch (error) {
    console.error('Error during cleanup:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanUpDatabase();
