-- CreateTable
CREATE TABLE "playlistReactions" (
    "id" SERIAL NOT NULL,
    "playlistID" TEXT NOT NULL,
    "reaction" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "playlistReactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "playlistReactions_playlistID_reaction_key" ON "playlistReactions"("playlistID", "reaction");
