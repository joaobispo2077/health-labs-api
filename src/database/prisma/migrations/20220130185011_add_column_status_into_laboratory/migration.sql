/*
  Warnings:

  - Added the required column `status` to the `laboratory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "laboratory" ADD COLUMN     "status" TEXT NOT NULL;
