/*
  Warnings:

  - A unique constraint covering the columns `[userId,artistID]` on the table `artistPinned` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,playlistID]` on the table `playlistPinned` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,songID]` on the table `songPinned` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "artistPinned_userId_artistID_key" ON "artistPinned"("userId", "artistID");

-- CreateIndex
CREATE UNIQUE INDEX "playlistPinned_userId_playlistID_key" ON "playlistPinned"("userId", "playlistID");

-- CreateIndex
CREATE UNIQUE INDEX "songPinned_userId_songID_key" ON "songPinned"("userId", "songID");
