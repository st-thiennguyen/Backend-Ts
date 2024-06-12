import { PrismaClient } from "@prisma/client";

interface PrismaGlobal extends Global {
  prisma: PrismaClient;
}

declare const global: PrismaGlobal;

const prisma = global.prisma || new PrismaClient();

global.prisma = prisma;

export default prisma;
