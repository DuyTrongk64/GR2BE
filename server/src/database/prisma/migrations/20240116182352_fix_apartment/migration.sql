/*
  Warnings:

  - Made the column `total_student` on table `apartment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `total_room` on table `apartment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "apartment" ALTER COLUMN "total_student" SET NOT NULL,
ALTER COLUMN "total_student" SET DEFAULT 0,
ALTER COLUMN "total_room" SET NOT NULL,
ALTER COLUMN "total_room" SET DEFAULT 0;
