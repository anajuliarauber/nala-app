/*
  Warnings:

  - Added the required column `nodeId` to the `Position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `x` to the `Position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `y` to the `Position` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Relation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sourceId" INTEGER NOT NULL,
    "targetId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Relation_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Position" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Relation_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Position" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Position" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "tier" INTEGER NOT NULL,
    "divisionId" INTEGER NOT NULL,
    "nodeId" TEXT NOT NULL,
    "x" REAL NOT NULL,
    "y" REAL NOT NULL,
    CONSTRAINT "Position_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Position" ("divisionId", "id", "tier", "title") SELECT "divisionId", "id", "tier", "title" FROM "Position";
DROP TABLE "Position";
ALTER TABLE "new_Position" RENAME TO "Position";
CREATE UNIQUE INDEX "Position_nodeId_key" ON "Position"("nodeId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
