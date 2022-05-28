/*
  Warnings:

  - You are about to alter the column `sharePercentage` on the `Split` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Split" (
    "expenseId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "shareAmount" REAL NOT NULL,
    "sharePercentage" REAL NOT NULL,
    "isSettled" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("expenseId", "userId"),
    CONSTRAINT "Split_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Split_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Split" ("createdAt", "expenseId", "isSettled", "shareAmount", "sharePercentage", "updatedAt", "userId") SELECT "createdAt", "expenseId", "isSettled", "shareAmount", "sharePercentage", "updatedAt", "userId" FROM "Split";
DROP TABLE "Split";
ALTER TABLE "new_Split" RENAME TO "Split";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
