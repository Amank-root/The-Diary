/*
  Warnings:

  - You are about to drop the column `connectionId` on the `Saved` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[diaryId,pageNumber]` on the table `Page` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Diary" DROP CONSTRAINT "Diary_userId_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_userId_fkey";

-- AlterTable
ALTER TABLE "Diary" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Saved" DROP COLUMN "connectionId",
ADD COLUMN     "diaryId" TEXT,
ADD COLUMN     "pageId" TEXT;

-- CreateIndex
CREATE INDEX "Diary_userId_idx" ON "Diary"("userId");

-- CreateIndex
CREATE INDEX "Note_userId_idx" ON "Note"("userId");

-- CreateIndex
CREATE INDEX "Page_diaryId_idx" ON "Page"("diaryId");

-- CreateIndex
CREATE UNIQUE INDEX "Page_diaryId_pageNumber_key" ON "Page"("diaryId", "pageNumber");

-- CreateIndex
CREATE INDEX "Reader_readerId_idx" ON "Reader"("readerId");

-- CreateIndex
CREATE INDEX "Reader_readingId_idx" ON "Reader"("readingId");

-- CreateIndex
CREATE INDEX "Saved_userId_idx" ON "Saved"("userId");

-- CreateIndex
CREATE INDEX "Saved_diaryId_idx" ON "Saved"("diaryId");

-- CreateIndex
CREATE INDEX "Saved_pageId_idx" ON "Saved"("pageId");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diary" ADD CONSTRAINT "Diary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saved" ADD CONSTRAINT "Saved_diaryId_fkey" FOREIGN KEY ("diaryId") REFERENCES "Diary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saved" ADD CONSTRAINT "Saved_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;
