/*
  Warnings:

  - The `RecentlyPlayed` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expirationDate" SET DEFAULT now() + interval '5 minutes';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "RecentlyPlayed",
ADD COLUMN     "RecentlyPlayed" INTEGER[];
