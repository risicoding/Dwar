/*
  Warnings:

  - You are about to drop the column `name` on the `Journal` table. All the data in the column will be lost.
  - You are about to drop the `Column` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Journal" DROP COLUMN "name";

-- DropTable
DROP TABLE "Column";

-- CreateTable
CREATE TABLE "Entries" (
    "id" SERIAL NOT NULL,
    "type" "ColumnName" NOT NULL,
    "journalId" INTEGER NOT NULL,
    "entry" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Entries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Entries_id_key" ON "Entries"("id");

-- AddForeignKey
ALTER TABLE "Entries" ADD CONSTRAINT "Entries_journalId_fkey" FOREIGN KEY ("journalId") REFERENCES "Journal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
