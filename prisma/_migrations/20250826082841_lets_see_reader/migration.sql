-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reader" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "readerId" TEXT NOT NULL,
    "readingId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Reader_readerId_fkey" FOREIGN KEY ("readerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Reader_readingId_fkey" FOREIGN KEY ("readingId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Reader" ("createdAt", "id", "readerId", "readingId") SELECT "createdAt", "id", "readerId", "readingId" FROM "Reader";
DROP TABLE "Reader";
ALTER TABLE "new_Reader" RENAME TO "Reader";
CREATE UNIQUE INDEX "Reader_readerId_readingId_key" ON "Reader"("readerId", "readingId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
