/*
  Warnings:

  - Added the required column `otpExpires` to the `Otp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Otp" ADD COLUMN     "otpExpires" TIMESTAMP(3) NOT NULL;
