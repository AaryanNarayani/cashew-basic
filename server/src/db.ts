import { PrismaClient } from '@prisma/client'
export const getPrisma = ()=> {
    const prisma = new PrismaClient();
    return prisma
}