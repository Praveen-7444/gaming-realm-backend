-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expirationDate" SET DEFAULT now() + interval '5 minutes';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "otpExpiry" TEXT;
