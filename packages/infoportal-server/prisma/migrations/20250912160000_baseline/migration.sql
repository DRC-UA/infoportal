-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Other');

-- CreateEnum
CREATE TYPE "FeatureAccessLevel" AS ENUM ('Read', 'Write', 'Admin');

-- CreateEnum
CREATE TYPE "FeatureAccessType" AS ENUM ('KoboForm');

-- CreateEnum
CREATE TYPE "MealVerificationAnswersStatus" AS ENUM ('Selected');

-- CreateEnum
CREATE TYPE "MealVerificationStatus" AS ENUM ('Approved', 'Rejected', 'Pending');

-- CreateEnum
CREATE TYPE "DatabaseViewVisibility" AS ENUM ('Public', 'Private', 'Sealed');

-- CreateEnum
CREATE TYPE "DatabaseViewColVisibility" AS ENUM ('Hidden', 'Visible');

-- CreateTable
CREATE TABLE "KoboServer" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "urlV1" TEXT,

    CONSTRAINT "KoboServer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KoboForm" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "uploadedBy" TEXT,
    "updatedBy" TEXT,
    "deploymentStatus" TEXT,
    "enketoUrl" TEXT,
    "submissionsCount" INTEGER,

    CONSTRAINT "KoboForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KoboAnswers" (
    "id" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "version" TEXT,
    "geolocation" TEXT,
    "answers" JSONB NOT NULL,
    "submissionTime" TIMESTAMP(3) NOT NULL,
    "formId" TEXT NOT NULL,
    "validationStatus" TEXT,
    "lastValidatedTimestamp" INTEGER,
    "validatedBy" TEXT,
    "attachments" JSONB[],
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "source" TEXT,
    "tags" JSONB,
    "uuid" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "KoboAnswers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KoboAnswersHistory" (
    "id" TEXT NOT NULL,
    "answerId" TEXT,
    "by" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT,
    "property" TEXT,
    "newValue" JSONB,
    "formId" TEXT,
    "oldValue" JSONB,

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
    "address" TEXT,
    "status" TEXT,
    "displacement" TEXT,
    "lastStatusUpdate" TIMESTAMP(3),
    "tags" JSONB,
    "koboId" TEXT NOT NULL,
    "passportNum" TEXT,
    "idFileName" TEXT,
    "taxIdFileName" TEXT,
    "idFileId" INTEGER,
    "taxIdFileId" INTEGER,

    CONSTRAINT "KoboMeta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastConnectedAt" TIMESTAMP(3),
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "officer" TEXT,
    "drcOffice" TEXT,
    "drcJob" TEXT,
    "createdBy" TEXT,
    "accessToken" TEXT,
    "name" TEXT,
    "avatar" BYTEA,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "MpcaWfpDeduplicationIdMapping" (
    "beneficiaryId" TEXT NOT NULL,
    "taxId" TEXT,

    CONSTRAINT "MpcaWfpDeduplicationIdMapping_pkey" PRIMARY KEY ("beneficiaryId")
);

-- CreateTable
CREATE TABLE "MpcaWfpDeduplication" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "wfpId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL,
    "beneficiaryId" TEXT NOT NULL,
    "message" TEXT,
    "status" TEXT NOT NULL,
    "validFrom" TIMESTAMP(3) NOT NULL,
    "existingOrga" TEXT,
    "existingStart" TIMESTAMP(3),
    "existingEnd" TIMESTAMP(3),
    "existingAmount" INTEGER,
    "office" TEXT,
    "fileName" TEXT,
    "fileUpload" TIMESTAMP(3),
    "category" TEXT,

    CONSTRAINT "MpcaWfpDeduplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatureAccess" (
    "id" TEXT NOT NULL,
    "featureId" TEXT,
    "params" JSONB,
    "level" "FeatureAccessLevel" NOT NULL,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "createdBy" TEXT,
    "featureType" "FeatureAccessType",
    "drcJob" TEXT,
    "drcOffice" TEXT,
    "groupId" TEXT,

    CONSTRAINT "FeatureAccess_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "AccessToken" (
    "id" TEXT NOT NULL,
    "createdBy" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,

    CONSTRAINT "AccessToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proxy" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "disabled" BOOLEAN,
    "slug" TEXT NOT NULL,
    "expireAt" TIMESTAMP(3),

    CONSTRAINT "Proxy_pkey" PRIMARY KEY ("id")
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
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT,
    "visibility" "DatabaseViewVisibility" NOT NULL DEFAULT 'Private',
    "databaseId" TEXT NOT NULL,
    "createdBy" TEXT,

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
    "subject" TEXT NOT NULL,
    "content" TEXT,
    "deliveredAt" TIMESTAMP(3),
    "cc" TEXT,
    "tags" JSONB,

    CONSTRAINT "EmailOutBox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workdoneat_backup" (
    "id" TEXT,
    "work_done_at" TEXT
);

-- CreateTable
CREATE TABLE "_KoboAnswersToHistory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_KoboAnswersToHistory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "KoboAnswers_deletedAt_idx" ON "KoboAnswers"("deletedAt");

-- CreateIndex
CREATE INDEX "KoboAnswers_date_idx" ON "KoboAnswers"("date");

-- CreateIndex
CREATE INDEX "KoboAnswers_formId_idx" ON "KoboAnswers"("formId");

-- CreateIndex
CREATE UNIQUE INDEX "KoboAnswers_id_formId_key" ON "KoboAnswers"("id", "formId");

-- CreateIndex
CREATE INDEX "KoboAnswersHistory_formId_idx" ON "KoboAnswersHistory"("formId");

-- CreateIndex
CREATE INDEX "KoboPerson_metaId_idx" ON "KoboPerson"("metaId");

-- CreateIndex
CREATE INDEX "KoboMeta_formId_idx" ON "KoboMeta"("formId");

-- CreateIndex
CREATE INDEX "KoboMeta_koboId_idx" ON "KoboMeta"("koboId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "MpcaWfpDeduplicationIdMapping_taxId_key" ON "MpcaWfpDeduplicationIdMapping"("taxId");

-- CreateIndex
CREATE UNIQUE INDEX "MpcaWfpDeduplicationIdMapping_beneficiaryId_taxId_key" ON "MpcaWfpDeduplicationIdMapping"("beneficiaryId", "taxId");

-- CreateIndex
CREATE UNIQUE INDEX "Group_name_key" ON "Group"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sid_key" ON "Session"("sid");

-- CreateIndex
CREATE UNIQUE INDEX "Proxy_name_key" ON "Proxy"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Proxy_slug_key" ON "Proxy"("slug");

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

-- AddForeignKey
ALTER TABLE "KoboForm" ADD CONSTRAINT "KoboForm_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "KoboServer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KoboAnswers" ADD CONSTRAINT "KoboAnswers_formId_fkey" FOREIGN KEY ("formId") REFERENCES "KoboForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KoboAnswersHistory" ADD CONSTRAINT "KoboAnswersHistory_formId_fkey" FOREIGN KEY ("formId") REFERENCES "KoboForm"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KoboPerson" ADD CONSTRAINT "KoboPerson_metaId_fkey" FOREIGN KEY ("metaId") REFERENCES "KoboMeta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserActivity" ADD CONSTRAINT "UserActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MpcaWfpDeduplication" ADD CONSTRAINT "MpcaWfpDeduplication_beneficiaryId_fkey" FOREIGN KEY ("beneficiaryId") REFERENCES "MpcaWfpDeduplicationIdMapping"("beneficiaryId") ON DELETE RESTRICT ON UPDATE CASCADE;

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

