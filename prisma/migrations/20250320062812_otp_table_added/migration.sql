/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Otp` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Otp` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Otp_userId_code_key";

-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expirationDate" SET DEFAULT now() + interval '5 minutes';

-- CreateIndex
CREATE UNIQUE INDEX "Otp_userId_key" ON "Otp"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Otp_code_key" ON "Otp"("code");
