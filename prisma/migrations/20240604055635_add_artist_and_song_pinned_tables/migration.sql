-- CreateTable
CREATE TABLE "ArtistPinned" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "artistID" TEXT NOT NULL,
    "artistName" TEXT NOT NULL,
    "ArtistImageLink" TEXT NOT NULL,
    "ArtistLink" TEXT NOT NULL,

    CONSTRAINT "ArtistPinned_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SongPinned" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "songID" TEXT NOT NULL,
    "songName" TEXT NOT NULL,
    "songImageLink" TEXT NOT NULL,
    "songLink" TEXT NOT NULL,

    CONSTRAINT "SongPinned_pkey" PRIMARY KEY ("id")
);
