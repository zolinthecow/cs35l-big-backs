/*
  Warnings:

  - Added the required column `artistName` to the `SongPinned` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SongPinned" ADD COLUMN     "artistName" TEXT NOT NULL;
