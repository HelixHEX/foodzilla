-- AlterTable
ALTER TABLE "Vote_Session" ADD COLUMN     "ends" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "endsAt" TEXT;
