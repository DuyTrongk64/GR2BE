-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "apartment" (
    "apartment_id" SERIAL NOT NULL,
    "apartment_name" VARCHAR(50) NOT NULL,
    "total_student" INTEGER NOT NULL,
    "total_room" INTEGER NOT NULL,
    "manager_id" INTEGER,

    CONSTRAINT "apartment_pkey" PRIMARY KEY ("apartment_id")
);

-- CreateTable
CREATE TABLE "room" (
    "room_id" SERIAL NOT NULL,
    "room_name" VARCHAR(50) NOT NULL,
    "room_type_id" INTEGER,
    "apartment_id" INTEGER,

    CONSTRAINT "room_pkey" PRIMARY KEY ("room_id")
);

-- CreateTable
CREATE TABLE "room_type" (
    "room_type_id" SERIAL NOT NULL,
    "gender" "Gender" NOT NULL,
    "capacity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "room_type_pkey" PRIMARY KEY ("room_type_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "full_name" VARCHAR(50) NOT NULL,
    "mssv" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "user_type" "Role" NOT NULL DEFAULT 'USER',
    "is_valid" BOOLEAN NOT NULL DEFAULT false,
    "room_id" INTEGER,
    "major" VARCHAR(50) NOT NULL,
    "gender" "Gender" NOT NULL,
    "avatar_url" VARCHAR(255),
    "batch" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(255),
    "birthday" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "registration" (
    "registration_id" SERIAL NOT NULL,
    "registration_name" VARCHAR(50) NOT NULL,
    "start_register" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_register" TIMESTAMP(3) NOT NULL,
    "semester" INTEGER NOT NULL,

    CONSTRAINT "registration_pkey" PRIMARY KEY ("registration_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_mssv_key" ON "users"("mssv");

-- AddForeignKey
ALTER TABLE "apartment" ADD CONSTRAINT "apartment_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room" ADD CONSTRAINT "room_room_type_id_fkey" FOREIGN KEY ("room_type_id") REFERENCES "room_type"("room_type_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room" ADD CONSTRAINT "room_apartment_id_fkey" FOREIGN KEY ("apartment_id") REFERENCES "apartment"("apartment_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room"("room_id") ON DELETE SET NULL ON UPDATE CASCADE;
