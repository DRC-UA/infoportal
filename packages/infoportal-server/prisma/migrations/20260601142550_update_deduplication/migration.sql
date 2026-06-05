-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'UAH', 'EUR');

-- CreateTable
CREATE TABLE "UctWfpDeduplication" (
    "id" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "drcOffice" TEXT NOT NULL,
    "taxId" TEXT NOT NULL,
    "result" TEXT,
    "organisation" TEXT NOT NULL,
    "deduplicationType" TEXT,
    "reason" TEXT,
    "category" TEXT NOT NULL,
    "currency" "Currency" NOT NULL,
    "amount" INTEGER NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,

    CONSTRAINT "UctWfpDeduplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UctWfpDeduplication_fileName_taxId_key" ON "UctWfpDeduplication"("fileName", "taxId");
