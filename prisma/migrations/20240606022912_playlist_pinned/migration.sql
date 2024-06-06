/*
  Warnings:

  - You are about to drop the `Note` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Song` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_song_id_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_song_id_fkey";

-- DropForeignKey
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_user_id_fkey";

-- DropTable
DROP TABLE "Note";

-- DropTable
DROP TABLE "Reaction";

-- DropTable
DROP TABLE "Song";

-- CreateTable
CREATE TABLE "songNotes" (
    "id" SERIAL NOT NULL,
    "userID" TEXT NOT NULL,
    "commName" TEXT NOT NULL,
    "playlistID" TEXT NOT NULL,
    "songID" TEXT NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "songNotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "userID" TEXT NOT NULL,
    "playlistID" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);
