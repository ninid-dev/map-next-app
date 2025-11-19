import { PrismaClient, Prisma } from "../app/generated/prisma/client";

const globalForPrisma = globalThis

const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export { Prisma }

export default prisma

