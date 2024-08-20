import {PrismaClient} from '@prisma/client'

export class DatabaseView {
  constructor(private prisma: PrismaClient) {
  }
}
