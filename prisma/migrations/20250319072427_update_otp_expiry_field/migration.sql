/*
  Warnings:

  - Added the required column `otpExpiry` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resetOtp` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "otpExpiry" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "resetOtp" TEXT NOT NULL;
