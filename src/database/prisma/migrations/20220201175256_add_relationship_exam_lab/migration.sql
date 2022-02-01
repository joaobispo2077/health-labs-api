-- CreateTable
CREATE TABLE "laboratory_exam" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "laboratoryId" TEXT NOT NULL,
    "examId" TEXT NOT NULL,

    CONSTRAINT "laboratory_exam_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "laboratory_exam" ADD CONSTRAINT "laboratory_exam_examId_fkey" FOREIGN KEY ("examId") REFERENCES "exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laboratory_exam" ADD CONSTRAINT "laboratory_exam_laboratoryId_fkey" FOREIGN KEY ("laboratoryId") REFERENCES "laboratory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
