-- CreateTable
CREATE TABLE "_GroupToRestaraunt" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToRestaraunt_AB_unique" ON "_GroupToRestaraunt"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToRestaraunt_B_index" ON "_GroupToRestaraunt"("B");

-- AddForeignKey
ALTER TABLE "_GroupToRestaraunt" ADD FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToRestaraunt" ADD FOREIGN KEY ("B") REFERENCES "Restaraunt"("id") ON DELETE CASCADE ON UPDATE CASCADE;
