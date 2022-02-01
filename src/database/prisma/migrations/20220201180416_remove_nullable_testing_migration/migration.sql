/*
  Warnings:

  - Made the column `type` on table `exam` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "exam" ALTER COLUMN "type" SET NOT NULL;
