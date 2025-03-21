/*
  Warnings:

  - You are about to drop the `UserRecentGame` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserRecentGame" DROP CONSTRAINT "UserRecentGame_gameId_fkey";

-- DropForeignKey
ALTER TABLE "UserRecentGame" DROP CONSTRAINT "UserRecentGame_userId_fkey";

-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expirationDate" SET DEFAULT now() + interval '5 minutes';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "RecentlyPlayed" TEXT[];

-- DropTable
DROP TABLE "UserRecentGame";
