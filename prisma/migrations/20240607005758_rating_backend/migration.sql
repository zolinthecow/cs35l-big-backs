-- CreateTable
CREATE TABLE "playlistRating" (
    "id" SERIAL NOT NULL,
    "userID" TEXT NOT NULL,
    "playlistID" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,

    CONSTRAINT "playlistRating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "playlistRating_userID_playlistID_key" ON "playlistRating"("userID", "playlistID");
