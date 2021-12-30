/*
  Warnings:

  - You are about to drop the column `restaurant_name` on the `Vote_Session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Vote_Session" DROP COLUMN "restaurant_name",
ADD COLUMN     "restaurants" TEXT[];
