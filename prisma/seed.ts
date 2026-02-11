import { PrismaClient } from '@/generated/prisma/client';
import { users, diaries, pages, accounts } from '@/lib/data';

const prisma = new PrismaClient({
  
});

async function main() {
  // Seed your database here
  console.log('Seeding database...');
  // Helper function to convert string dates to Date objects
  const convertDates = (obj: any) => {
    const converted = { ...obj };
    if (converted.createdAt)
      converted.createdAt = new Date(converted.createdAt);
    if (converted.updatedAt)
      converted.updatedAt = new Date(converted.updatedAt);
    if (converted.accessTokenExpiresAt)
      converted.accessTokenExpiresAt = new Date(converted.accessTokenExpiresAt);
    if (converted.refreshTokenExpiresAt)
      converted.refreshTokenExpiresAt = new Date(
        converted.refreshTokenExpiresAt
      );
    return converted;
  };

  // Seed users
  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: convertDates(user),
    });
  }
  console.log('Users seeded.');

  // Seed accounts
  for (const account of accounts) {
    await prisma.account.upsert({
      where: {
        providerId_accountId: {
          providerId: account.providerId,
          accountId: account.accountId,
        },
      },
      update: {},
      create: convertDates(account),
    });
  }
  console.log('Accounts seeded.');

  // Seed diaries
  for (const diary of diaries) {
    await prisma.diary.upsert({
      where: { id: diary.id },
      update: {},
      create: {
        ...convertDates(diary),
        types: diary.types as any, // Cast to satisfy TypeScript
      },
    });
  }
  console.log('Diaries seeded.');

  // Seed pages
  for (const page of pages) {
    await prisma.page.upsert({
      where: { id: page.id },
      update: {},
      create: convertDates(page),
    });
  }
  console.log('Pages seeded.');
  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Disconnecting Prisma Client...');
    console.log(`
            Your data has been seeded successfully! 🎉
            email: ${users.map((u) => u.email).join(', ')}
            password: Pa$$w0rd!
            `);
    await prisma.$disconnect();
  });
