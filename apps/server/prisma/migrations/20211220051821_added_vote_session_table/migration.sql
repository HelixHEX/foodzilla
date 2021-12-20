-- CreateTable
CREATE TABLE "Vote_Session" (
    "id" TEXT NOT NULL,
    "restaurant_name" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,

    CONSTRAINT "Vote_Session_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vote_Session" ADD CONSTRAINT "Vote_Session_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
