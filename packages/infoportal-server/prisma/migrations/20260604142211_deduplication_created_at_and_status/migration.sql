-- CreateEnum
CREATE TYPE "Deduplication" AS ENUM ('Eligible', 'Deduplicated');

-- AlterTable
ALTER TABLE "UctWfpDeduplication" ADD COLUMN     "status" "Deduplication",
ADD COLUMN     "uploadedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
