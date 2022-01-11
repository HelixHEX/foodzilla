-- CreateTable
CREATE TABLE "_RestarauntToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RestarauntToUser_AB_unique" ON "_RestarauntToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RestarauntToUser_B_index" ON "_RestarauntToUser"("B");

-- AddForeignKey
ALTER TABLE "_RestarauntToUser" ADD FOREIGN KEY ("A") REFERENCES "Restaraunt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RestarauntToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
