// lib/prisma.ts
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { readReplicas } from "@prisma/extension-read-replicas";

const createPrismaClient = () => {
  // Primary (write) client
  const mainAdapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  });
  const mainClient = new PrismaClient({ adapter: mainAdapter });

  // Replica 1
  const replica1Adapter = new PrismaPg({
    connectionString: process.env.REPLICA_URL_1!,
  });
  const replica1Client = new PrismaClient({ adapter: replica1Adapter });

  // Replica 2
  const replica2Adapter = new PrismaPg({
    connectionString: process.env.REPLICA_URL_2!,
  });
  const replica2Client = new PrismaClient({ adapter: replica2Adapter });

  // Replica 3
  const replica3Adapter = new PrismaPg({
    connectionString: process.env.REPLICA_URL_3!,
  });
  const replica3Client = new PrismaClient({ adapter: replica3Adapter });

  return mainClient.$extends(
    readReplicas({
      replicas: [replica1Client, replica2Client, replica3Client],
    }),
  );
};

type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>;

const globalForPrisma = globalThis as unknown as {
  prisma: ExtendedPrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}


// // lib/prisma.ts
// import { PrismaClient } from "@/generated/prisma/client";
// import { PrismaPg } from "@prisma/adapter-pg";
// import { readReplicas } from "@prisma/extension-read-replicas";

// // Primary (write) client
// const mainAdapter = new PrismaPg({
//   connectionString: process.env.DATABASE_URL!, // primary/write URL
// });
// const mainClient = new PrismaClient({ adapter: mainAdapter });

// // Replica 1
// const replica1Adapter = new PrismaPg({
//   connectionString: process.env.REPLICA_URL_1!, // read-only compute 1
// });
// const replica1Client = new PrismaClient({ adapter: replica1Adapter });

// // Replica 2
// const replica2Adapter = new PrismaPg({
//   connectionString: process.env.REPLICA_URL_2!, // read-only compute 2
// });
// const replica2Client = new PrismaClient({ adapter: replica2Adapter });

// // Replica 3
// const replica3Adapter = new PrismaPg({
//   connectionString: process.env.REPLICA_URL_3!, // read-only compute 3
// });
// const replica3Client = new PrismaClient({ adapter: replica3Adapter });

// // Global type (Next.js hot reload safe)
// const globalForPrisma = global as unknown as {
//   prisma: ReturnType<typeof mainClient.$extends> | undefined;
// };

// // Extend main client with read replicas
// const prismaExtended =
//   globalForPrisma.prisma ??
//   mainClient.$extends(
//     readReplicas({
//       replicas: [replica1Client, replica2Client, replica3Client],
//     }),
//   );

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prismaExtended;
// }

// export const prisma = prismaExtended;

// // lib/prisma.ts
// import { PrismaClient } from "@/generated/prisma/client";
// import { PrismaPg } from "@prisma/adapter-pg";

// const adapter = new PrismaPg({
//   connectionString: process.env.DATABASE_URL!,
// });

// const globalForPrisma = global as unknown as {
//   prisma: PrismaClient | undefined;
// };

// export const prisma =
//   globalForPrisma.prisma ?? 
//   new PrismaClient({
//     adapter,
//   });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;


// import { readReplicas } from '@prisma/extension-read-replicas'
// import { PrismaPg } from '@prisma/adapter-pg'
// import { PrismaClient } from './generated/prisma/client'

// // Primary (write) compute
// const mainAdapter = new PrismaPg({
//   connectionString: process.env.DATABASE_URL!, // Neon primary/write URL
// })
// const mainClient = new PrismaClient({ adapter: mainAdapter })

// // Read replica 1
// const replica1Adapter = new PrismaPg({
//   connectionString: process.env.REPLICA_URL_1!, // Neon read-only compute 1
// })
// const replica1Client = new PrismaClient({ adapter: replica1Adapter })

// // Read replica 2
// const replica2Adapter = new PrismaPg({
//   connectionString: process.env.REPLICA_URL_2!, // Neon read-only compute 2
// })
// const replica2Client = new PrismaClient({ adapter: replica2Adapter })

// // Read replica 3
// const replica3Adapter = new PrismaPg({
//   connectionString: process.env.REPLICA_URL_3!, // Neon read-only compute 3
// })
// const replica3Client = new PrismaClient({ adapter: replica3Adapter })

// // Extend main client with read replicas
// export const prisma = mainClient.$extends(
//   readReplicas({
//     replicas: [replica1Client, replica2Client, replica3Client],
//   }),
// )

// // Example usage:
// // This runs on a replica:
// await prisma.post.findMany()

// // This runs on the primary:
// await prisma.post.create({ data: { /* ... */ } })