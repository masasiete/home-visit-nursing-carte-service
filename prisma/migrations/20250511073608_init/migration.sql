-- CreateTable
CREATE TABLE "carte" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "patient" TEXT NOT NULL,
    "visitedAt" DATETIME NOT NULL,
    "nextVisitAt" DATETIME,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
