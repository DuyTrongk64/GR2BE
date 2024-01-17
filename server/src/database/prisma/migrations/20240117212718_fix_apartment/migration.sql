/*
  Warnings:

  - A unique constraint covering the columns `[apartment_name]` on the table `apartment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "apartment_apartment_name_key" ON "apartment"("apartment_name");
