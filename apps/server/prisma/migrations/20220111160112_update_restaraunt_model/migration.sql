-- CreateTable
CREATE TABLE "Restaraunt" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "lon" INTEGER NOT NULL,
    "lat" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "categorySet" INTEGER NOT NULL,
    "url" TEXT,
    "phone" TEXT,

    CONSTRAINT "Restaraunt_pkey" PRIMARY KEY ("id")
);
