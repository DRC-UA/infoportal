/*
  Warnings:

  - A unique constraint covering the columns `[fileName,taxId,deduplicationType,reason]` on the table `UctWfpDeduplication` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UctWfpDeduplication_fileName_taxId_key";

-- CreateIndex
CREATE UNIQUE INDEX "UctWfpDeduplication_fileName_taxId_deduplicationType_reason_key" ON "UctWfpDeduplication"("fileName", "taxId", "deduplicationType", "reason");
