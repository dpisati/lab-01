/*
  Warnings:

  - You are about to drop the column `authUserId` on the `Course` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authUserId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Course_authUserId_key";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "authUserId";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "authUserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Student_authUserId_key" ON "Student"("authUserId");
