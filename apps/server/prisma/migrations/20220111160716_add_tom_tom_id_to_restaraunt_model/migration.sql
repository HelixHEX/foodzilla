/*
  Warnings:

  - Added the required column `tomtom_id` to the `Restaraunt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Restaraunt" ADD COLUMN     "tomtom_id" TEXT NOT NULL;
