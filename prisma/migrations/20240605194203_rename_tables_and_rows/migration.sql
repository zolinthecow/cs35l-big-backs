/*
  Warnings:

  - You are about to drop the `ArtistPinned` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlaylistPinned` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SongPinned` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ArtistPinned";

-- DropTable
DROP TABLE "PlaylistPinned";

-- DropTable
DROP TABLE "SongPinned";

-- CreateTable
CREATE TABLE "playlistPinned" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "playlistID" TEXT NOT NULL,
    "playlistName" TEXT NOT NULL,
    "playlistImageLink" TEXT NOT NULL,
    "playlistLink" TEXT NOT NULL,
    "numberOfTracks" INTEGER NOT NULL,

    CONSTRAINT "playlistPinned_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artistPinned" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "artistID" TEXT NOT NULL,
    "artistName" TEXT NOT NULL,
    "artistImageLink" TEXT NOT NULL,
    "artistLink" TEXT NOT NULL,

    CONSTRAINT "artistPinned_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "songPinned" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "songID" TEXT NOT NULL,
    "songName" TEXT NOT NULL,
    "artistName" TEXT NOT NULL,
    "songImageLink" TEXT NOT NULL,
    "songLink" TEXT NOT NULL,

    CONSTRAINT "songPinned_pkey" PRIMARY KEY ("id")
);
