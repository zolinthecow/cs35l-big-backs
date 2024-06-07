/*
  Warnings:

  - A unique constraint covering the columns `[userID,playlistID,songID]` on the table `songNotes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "songNotes_userID_playlistID_songID_key" ON "songNotes"("userID", "playlistID", "songID");
