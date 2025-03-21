/*
  Warnings:

  - You are about to drop the `_LikedGames` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_LikedGames" DROP CONSTRAINT "_LikedGames_A_fkey";

-- DropForeignKey
ALTER TABLE "_LikedGames" DROP CONSTRAINT "_LikedGames_B_fkey";

-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expirationDate" SET DEFAULT now() + interval '5 minutes';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "likedGames" INTEGER[] DEFAULT ARRAY[]::INTEGER[];

-- DropTable
DROP TABLE "_LikedGames";
