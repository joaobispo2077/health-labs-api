-- DropForeignKey
ALTER TABLE "laboratoryExam" DROP CONSTRAINT "laboratoryExam_examId_fkey";

-- DropForeignKey
ALTER TABLE "laboratoryExam" DROP CONSTRAINT "laboratoryExam_laboratoryId_fkey";

-- AlterTable
ALTER TABLE "laboratoryExam" ALTER COLUMN "laboratoryId" DROP NOT NULL,
ALTER COLUMN "examId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "laboratoryExam" ADD CONSTRAINT "laboratoryExam_examId_fkey" FOREIGN KEY ("examId") REFERENCES "exam"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laboratoryExam" ADD CONSTRAINT "laboratoryExam_laboratoryId_fkey" FOREIGN KEY ("laboratoryId") REFERENCES "laboratory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
