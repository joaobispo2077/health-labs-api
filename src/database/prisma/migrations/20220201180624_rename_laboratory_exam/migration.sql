/*
  Warnings:

  - You are about to drop the `laboratory_exam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "laboratory_exam" DROP CONSTRAINT "laboratory_exam_examId_fkey";

-- DropForeignKey
ALTER TABLE "laboratory_exam" DROP CONSTRAINT "laboratory_exam_laboratoryId_fkey";

-- DropTable
DROP TABLE "laboratory_exam";

-- CreateTable
CREATE TABLE "laboratoryExam" (
    "id" TEXT NOT NULL,
    "laboratoryId" TEXT NOT NULL,
    "examId" TEXT NOT NULL,

    CONSTRAINT "laboratoryExam_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "laboratoryExam" ADD CONSTRAINT "laboratoryExam_examId_fkey" FOREIGN KEY ("examId") REFERENCES "exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laboratoryExam" ADD CONSTRAINT "laboratoryExam_laboratoryId_fkey" FOREIGN KEY ("laboratoryId") REFERENCES "laboratory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
