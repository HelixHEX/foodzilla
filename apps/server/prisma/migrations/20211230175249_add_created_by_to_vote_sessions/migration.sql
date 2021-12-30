/*
  Warnings:

  - You are about to drop the column `restaurants` on the `Vote_Session` table. All the data in the column will be lost.
  - Added the required column `createdBy` to the `Vote_Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vote_Session" DROP COLUMN "restaurants",
ADD COLUMN     "createdBy" TEXT NOT NULL;
