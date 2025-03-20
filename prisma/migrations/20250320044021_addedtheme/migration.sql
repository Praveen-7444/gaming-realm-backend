-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('ultraviolet', 'greengable', 'justblack', 'Oceanic');

-- CreateEnum
CREATE TYPE "Font" AS ENUM ('couriernew', 'trebuchetms', 'lucidasans', 'arial');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userFont" "Font" NOT NULL DEFAULT 'couriernew',
ADD COLUMN     "userTheme" "Theme" NOT NULL DEFAULT 'ultraviolet';
