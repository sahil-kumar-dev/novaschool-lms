/*
  Warnings:

  - You are about to drop the column `photoUrl` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "photoUrl",
ADD COLUMN     "thumbnail" TEXT;
