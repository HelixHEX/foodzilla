-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "resauarant_name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "VoteSessionId" TEXT NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_VoteSessionId_fkey" FOREIGN KEY ("VoteSessionId") REFERENCES "Vote_Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
