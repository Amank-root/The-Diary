/*
  Warnings:

  - You are about to drop the column `slug` on the `Diary` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Diary" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "diaryCoverImage" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "types" TEXT NOT NULL,
    CONSTRAINT "Diary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Diary" ("createdAt", "diaryCoverImage", "id", "title", "types", "updatedAt", "userId") SELECT "createdAt", "diaryCoverImage", "id", "title", "types", "updatedAt", "userId" FROM "Diary";
DROP TABLE "Diary";
ALTER TABLE "new_Diary" RENAME TO "Diary";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
