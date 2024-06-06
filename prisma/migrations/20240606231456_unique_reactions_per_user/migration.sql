-- CreateTable
CREATE TABLE "userPlaylistReactions" (
    "id" SERIAL NOT NULL,
    "userID" TEXT NOT NULL,
    "playlistID" TEXT NOT NULL,
    "reaction" INTEGER NOT NULL,

    CONSTRAINT "userPlaylistReactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userPlaylistReactions_userID_playlistID_reaction_key" ON "userPlaylistReactions"("userID", "playlistID", "reaction");
