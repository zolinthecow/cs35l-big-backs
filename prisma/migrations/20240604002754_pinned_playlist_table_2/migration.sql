/*
  Warnings:

  - Added the required column `NumbeOfTracks` to the `PlaylistPinned` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlaylistPinned" ADD COLUMN     "NumbeOfTracks" INTEGER NOT NULL;
