-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DiaryTypeOnDiary" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "diaryId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    CONSTRAINT "DiaryTypeOnDiary_diaryId_fkey" FOREIGN KEY ("diaryId") REFERENCES "Diary" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_DiaryTypeOnDiary" ("diaryId", "id", "type") SELECT "diaryId", "id", "type" FROM "DiaryTypeOnDiary";
DROP TABLE "DiaryTypeOnDiary";
ALTER TABLE "new_DiaryTypeOnDiary" RENAME TO "DiaryTypeOnDiary";
CREATE TABLE "new_Page" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" JSONB NOT NULL,
    "pageNumber" INTEGER NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "diaryId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Page_diaryId_fkey" FOREIGN KEY ("diaryId") REFERENCES "Diary" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Page" ("content", "createdAt", "diaryId", "id", "isPublic", "pageNumber", "updatedAt") SELECT "content", "createdAt", "diaryId", "id", "isPublic", "pageNumber", "updatedAt" FROM "Page";
DROP TABLE "Page";
ALTER TABLE "new_Page" RENAME TO "Page";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
