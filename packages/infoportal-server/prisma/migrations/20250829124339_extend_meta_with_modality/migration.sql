/*
  Warnings:

  - The primary key for the `KoboAnswers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `MpcaPaymentTool` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MpcaPaymentToolAnswers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date` to the `KoboAnswers` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Other');

-- CreateEnum
CREATE TYPE "MealVerificationAnswersStatus" AS ENUM ('Selected');

-- CreateEnum
CREATE TYPE "MealVerificationStatus" AS ENUM ('Approved', 'Rejected', 'Pending');

-- CreateEnum
CREATE TYPE "DatabaseViewVisibility" AS ENUM ('Public', 'Private', 'Sealed');

-- CreateEnum
CREATE TYPE "DatabaseViewColVisibility" AS ENUM ('Hidden', 'Visible');

-- DropForeignKey
ALTER TABLE "MpcaPaymentToolAnswers" DROP CONSTRAINT "MpcaPaymentToolAnswers_koboAnswersUuid_fkey";

-- DropForeignKey
ALTER TABLE "MpcaPaymentToolAnswers" DROP CONSTRAINT "MpcaPaymentToolAnswers_mpcaPaymentToolId_fkey";

-- AlterTable
ALTER TABLE "FeatureAccess" ADD COLUMN     "groupId" TEXT;

-- AlterTable
ALTER TABLE "KoboAnswers" DROP CONSTRAINT "KoboAnswers_pkey",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "version" DROP NOT NULL,
ADD CONSTRAINT "KoboAnswers_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "KoboForm" ADD COLUMN     "deploymentStatus" TEXT,
ADD COLUMN     "enketoUrl" TEXT,
ADD COLUMN     "submissionsCount" INTEGER,
ADD COLUMN     "updatedBy" TEXT,
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "KoboServer" ADD COLUMN     "urlV1" TEXT;

-- AlterTable
ALTER TABLE "MpcaWfpDeduplication" ADD COLUMN     "category" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accessToken" TEXT,
ADD COLUMN     "avatar" BYTEA,
ADD COLUMN     "name" TEXT;

-- DropTable
DROP TABLE "MpcaPaymentTool";

-- DropTable
DROP TABLE "MpcaPaymentToolAnswers";

-- CreateTable
CREATE TABLE "KoboAnswersHistory" (
    "id" TEXT NOT NULL,
    "formId" TEXT,
    "answerId" TEXT,
    "by" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT,
    "property" TEXT,
    "oldValue" JSONB,
    "newValue" JSONB,

    CONSTRAINT "KoboAnswersHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KoboPerson" (
    "id" TEXT NOT NULL,
    "age" INTEGER,
    "gender" "Gender",
    "disability" TEXT[],
    "displacement" TEXT,
    "metaId" TEXT NOT NULL,

    CONSTRAINT "KoboPerson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KoboMeta" (
    "id" TEXT NOT NULL,
    "koboId" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "referencedFormId" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "oblast" TEXT,
    "raion" TEXT,
    "hromada" TEXT,
    "settlement" TEXT,
    "personsCount" INTEGER,
    "enumerator" TEXT,
    "taxId" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "patronymicName" TEXT,
    "phone" TEXT,
    "activity" TEXT,
    "sector" TEXT,
    "office" TEXT,
    "project" TEXT[],
    "donor" TEXT[],
    "displacement" TEXT,
    "address" TEXT,
    "status" TEXT,
    "taxIdFileName" TEXT,
    "taxIdFileId" INTEGER,
    "idFileName" TEXT,
    "idFileId" INTEGER,
    "passportNum" TEXT,
    "modality" TEXT,
    "lastStatusUpdate" TIMESTAMP(3),
    "tags" JSONB,

    CONSTRAINT "KoboMeta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserActivity" (
    "id" TEXT NOT NULL,
    "at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "detail" TEXT,
    "userId" TEXT,

    CONSTRAINT "UserActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "desc" TEXT,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupItem" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "drcJob" TEXT,
    "drcOffice" TEXT,
    "email" TEXT,
    "level" "FeatureAccessLevel" NOT NULL,
    "groupId" TEXT,

    CONSTRAINT "GroupItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProxyUsage" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddresses" TEXT[],
    "proxyId" TEXT NOT NULL,

    CONSTRAINT "ProxyUsage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealVerificationAnswers" (
    "id" TEXT NOT NULL,
    "koboAnswerId" TEXT NOT NULL,
    "mealVerificationId" TEXT NOT NULL,
    "status" "MealVerificationAnswersStatus",

    CONSTRAINT "MealVerificationAnswers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealVerification" (
    "id" TEXT NOT NULL,
    "activity" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "filters" JSONB NOT NULL,
    "status" "MealVerificationStatus",

    CONSTRAINT "MealVerification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JsonStore" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,

    CONSTRAINT "JsonStore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DatabaseView" (
    "id" TEXT NOT NULL,
    "databaseId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT,
    "visibility" "DatabaseViewVisibility" NOT NULL DEFAULT 'Private',

    CONSTRAINT "DatabaseView_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DatabaseViewCol" (
    "name" TEXT NOT NULL,
    "viewId" TEXT NOT NULL,
    "width" INTEGER,
    "visibility" "DatabaseViewColVisibility" DEFAULT 'Visible'
);

-- CreateTable
CREATE TABLE "EmailOutBox" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "context" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "cc" TEXT,
    "subject" TEXT NOT NULL,
    "content" TEXT,
    "deliveredAt" TIMESTAMP(3),
    "tags" JSONB,

    CONSTRAINT "EmailOutBox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_KoboAnswersToHistory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_KoboAnswersToHistory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "KoboAnswersHistory_formId_idx" ON "KoboAnswersHistory"("formId");

-- CreateIndex
CREATE INDEX "KoboPerson_metaId_idx" ON "KoboPerson"("metaId");

-- CreateIndex
CREATE INDEX "KoboMeta_formId_idx" ON "KoboMeta"("formId");

-- CreateIndex
CREATE INDEX "KoboMeta_koboId_idx" ON "KoboMeta"("koboId");

-- CreateIndex
CREATE UNIQUE INDEX "Group_name_key" ON "Group"("name");

-- CreateIndex
CREATE UNIQUE INDEX "JsonStore_key_key" ON "JsonStore"("key");

-- CreateIndex
CREATE INDEX "DatabaseView_name_idx" ON "DatabaseView"("name");

-- CreateIndex
CREATE INDEX "DatabaseView_databaseId_idx" ON "DatabaseView"("databaseId");

-- CreateIndex
CREATE UNIQUE INDEX "DatabaseView_databaseId_name_key" ON "DatabaseView"("databaseId", "name");

-- CreateIndex
CREATE INDEX "DatabaseViewCol_name_viewId_idx" ON "DatabaseViewCol"("name", "viewId");

-- CreateIndex
CREATE UNIQUE INDEX "DatabaseViewCol_name_viewId_key" ON "DatabaseViewCol"("name", "viewId");

-- CreateIndex
CREATE INDEX "_KoboAnswersToHistory_B_index" ON "_KoboAnswersToHistory"("B");

-- CreateIndex
CREATE INDEX "KoboAnswers_deletedAt_idx" ON "KoboAnswers"("deletedAt");

-- CreateIndex
CREATE INDEX "KoboAnswers_date_idx" ON "KoboAnswers"("date");

-- CreateIndex
CREATE INDEX "KoboAnswers_formId_idx" ON "KoboAnswers"("formId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- AddForeignKey
ALTER TABLE "KoboAnswersHistory" ADD CONSTRAINT "KoboAnswersHistory_formId_fkey" FOREIGN KEY ("formId") REFERENCES "KoboForm"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KoboPerson" ADD CONSTRAINT "KoboPerson_metaId_fkey" FOREIGN KEY ("metaId") REFERENCES "KoboMeta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserActivity" ADD CONSTRAINT "UserActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureAccess" ADD CONSTRAINT "FeatureAccess_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupItem" ADD CONSTRAINT "GroupItem_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProxyUsage" ADD CONSTRAINT "ProxyUsage_proxyId_fkey" FOREIGN KEY ("proxyId") REFERENCES "Proxy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealVerificationAnswers" ADD CONSTRAINT "MealVerificationAnswers_koboAnswerId_fkey" FOREIGN KEY ("koboAnswerId") REFERENCES "KoboAnswers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealVerificationAnswers" ADD CONSTRAINT "MealVerificationAnswers_mealVerificationId_fkey" FOREIGN KEY ("mealVerificationId") REFERENCES "MealVerification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DatabaseViewCol" ADD CONSTRAINT "DatabaseViewCol_viewId_fkey" FOREIGN KEY ("viewId") REFERENCES "DatabaseView"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KoboAnswersToHistory" ADD CONSTRAINT "_KoboAnswersToHistory_A_fkey" FOREIGN KEY ("A") REFERENCES "KoboAnswers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KoboAnswersToHistory" ADD CONSTRAINT "_KoboAnswersToHistory_B_fkey" FOREIGN KEY ("B") REFERENCES "KoboAnswersHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
