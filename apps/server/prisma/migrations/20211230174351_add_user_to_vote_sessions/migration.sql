-- CreateTable
CREATE TABLE "_UserToVote_Session" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToVote_Session_AB_unique" ON "_UserToVote_Session"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToVote_Session_B_index" ON "_UserToVote_Session"("B");

-- AddForeignKey
ALTER TABLE "_UserToVote_Session" ADD FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToVote_Session" ADD FOREIGN KEY ("B") REFERENCES "Vote_Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;
