/*
  Warnings:

  - You are about to drop the `DiaryTypeOnDiary` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `types` to the `Diary` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DiaryTypeOnDiary";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Diary" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "types" TEXT NOT NULL,
    CONSTRAINT "Diary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Diary" ("createdAt", "id", "slug", "title", "updatedAt", "userId") SELECT "createdAt", "id", "slug", "title", "updatedAt", "userId" FROM "Diary";
DROP TABLE "Diary";
ALTER TABLE "new_Diary" RENAME TO "Diary";
CREATE UNIQUE INDEX "Diary_slug_key" ON "Diary"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
