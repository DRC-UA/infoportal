-- CreateEnum
CREATE TYPE "Modality" AS ENUM ('Cash', 'InKind', 'Voucher', 'Combination');

-- AlterTable
ALTER TABLE "KoboMeta" ADD COLUMN     "modality" "Modality";
