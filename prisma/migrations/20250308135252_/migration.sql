/*
  Warnings:

  - Added the required column `userId` to the `Entries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entries" ADD COLUMN     "userId" TEXT NOT NULL;
