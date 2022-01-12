/*
  Warnings:

  - You are about to drop the `Restaraunt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GroupToRestaraunt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RestarauntToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GroupToRestaraunt" DROP CONSTRAINT "_GroupToRestaraunt_A_fkey";

-- DropForeignKey
ALTER TABLE "_GroupToRestaraunt" DROP CONSTRAINT "_GroupToRestaraunt_B_fkey";

-- DropForeignKey
ALTER TABLE "_RestarauntToUser" DROP CONSTRAINT "_RestarauntToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_RestarauntToUser" DROP CONSTRAINT "_RestarauntToUser_B_fkey";

-- DropTable
DROP TABLE "Restaraunt";

-- DropTable
DROP TABLE "_GroupToRestaraunt";

-- DropTable
DROP TABLE "_RestarauntToUser";

-- CreateTable
CREATE TABLE "Restaurant" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tomtom_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "lon" DOUBLE PRECISION NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "address" TEXT NOT NULL,
    "categorySet" INTEGER NOT NULL,
    "url" TEXT,
    "phone" TEXT,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RestaurantToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GroupToRestaurant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RestaurantToUser_AB_unique" ON "_RestaurantToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RestaurantToUser_B_index" ON "_RestaurantToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToRestaurant_AB_unique" ON "_GroupToRestaurant"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToRestaurant_B_index" ON "_GroupToRestaurant"("B");

-- AddForeignKey
ALTER TABLE "_RestaurantToUser" ADD FOREIGN KEY ("A") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RestaurantToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToRestaurant" ADD FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToRestaurant" ADD FOREIGN KEY ("B") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
