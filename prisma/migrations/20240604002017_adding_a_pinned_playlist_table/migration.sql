-- CreateTable
CREATE TABLE "PlaylistPinned" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "playlistID" TEXT NOT NULL,
    "playlistName" TEXT NOT NULL,
    "PlaylistImageLink" TEXT NOT NULL,
    "PlaylistLink" TEXT NOT NULL,

    CONSTRAINT "PlaylistPinned_pkey" PRIMARY KEY ("id")
);
