-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expirationDate" SET DEFAULT now() + interval '5 minutes';

-- CreateTable
CREATE TABLE "_LikedGames" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_LikedGames_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_LikedGames_B_index" ON "_LikedGames"("B");

-- AddForeignKey
ALTER TABLE "_LikedGames" ADD CONSTRAINT "_LikedGames_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("autoid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikedGames" ADD CONSTRAINT "_LikedGames_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
