/*
  Warnings:

  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `ratingValue` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `sendbirdId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_Friend` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `nickname` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "_Friend" DROP CONSTRAINT "_Friend_A_fkey";

-- DropForeignKey
ALTER TABLE "_Friend" DROP CONSTRAINT "_Friend_B_fkey";

-- DropIndex
DROP INDEX "User_sendbirdId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "bio",
DROP COLUMN "name",
DROP COLUMN "ratingValue",
DROP COLUMN "sendbirdId",
ALTER COLUMN "nickname" SET NOT NULL;

-- DropTable
DROP TABLE "_Friend";
