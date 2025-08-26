/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `isPublic` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `mediaUrl` on the `Note` table. All the data in the column will be lost.
  - Added the required column `color` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "position" JSONB NOT NULL,
    "text" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Note" ("createdAt", "id", "userId") SELECT "createdAt", "id", "userId" FROM "Note";
DROP TABLE "Note";
ALTER TABLE "new_Note" RENAME TO "Note";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
