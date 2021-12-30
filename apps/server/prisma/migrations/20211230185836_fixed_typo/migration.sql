/*
  Warnings:

  - You are about to drop the column `resauarant_name` on the `Vote` table. All the data in the column will be lost.
  - Added the required column `restaraunt_name` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "resauarant_name",
ADD COLUMN     "restaraunt_name" TEXT NOT NULL;
