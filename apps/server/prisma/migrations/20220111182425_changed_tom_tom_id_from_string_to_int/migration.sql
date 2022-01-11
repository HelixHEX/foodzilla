/*
  Warnings:

  - Changed the type of `tomtom_id` on the `Restaraunt` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Restaraunt" DROP COLUMN "tomtom_id",
ADD COLUMN     "tomtom_id" INTEGER NOT NULL;
