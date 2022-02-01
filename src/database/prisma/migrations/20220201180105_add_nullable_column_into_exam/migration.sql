/*
  Warnings:

  - You are about to drop the column `status` on the `laboratory_exam` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "exam" ADD COLUMN     "type" TEXT;

-- AlterTable
ALTER TABLE "laboratory_exam" DROP COLUMN "status";
