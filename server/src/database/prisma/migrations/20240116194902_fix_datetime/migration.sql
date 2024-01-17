-- AlterTable
ALTER TABLE "registration" ALTER COLUMN "start_register" SET DATA TYPE DATE,
ALTER COLUMN "end_register" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "birthday" SET DATA TYPE DATE;
