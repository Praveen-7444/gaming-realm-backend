-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "videoSrc" TEXT NOT NULL,
    "recentlyPlayedSrc" TEXT NOT NULL,
    "gameUrl" TEXT NOT NULL,
    "highestScore" INTEGER NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_title_key" ON "Game"("title");
