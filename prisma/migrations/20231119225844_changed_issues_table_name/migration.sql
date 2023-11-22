/*
  Warnings:

  - You are about to drop the `Issue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Issue";

-- CreateTable
CREATE TABLE "issues" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "issues_pkey" PRIMARY KEY ("id")
);
