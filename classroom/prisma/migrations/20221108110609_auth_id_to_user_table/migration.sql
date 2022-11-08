/*
  Warnings:

  - A unique constraint covering the columns `[authUserId]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "authUserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Course_authUserId_key" ON "Course"("authUserId");
