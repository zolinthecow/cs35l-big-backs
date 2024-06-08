/*
  Warnings:

  - You are about to drop the column `username` on the `comments` table. All the data in the column will be lost.
  - Changed the type of `time` on the `comments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "songNotes_userID_playlistID_songID_key";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "username",
DROP COLUMN "time",
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL;
