-- CreateEnum
CREATE TYPE "ColumnName" AS ENUM ('DID', 'WILL', 'ACHIEVE', 'REGRET');

-- CreateTable
CREATE TABLE "Entries" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "entry" TEXT NOT NULL,
    "column" "ColumnName" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Entries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Entries_userId_idx" ON "Entries"("userId");
