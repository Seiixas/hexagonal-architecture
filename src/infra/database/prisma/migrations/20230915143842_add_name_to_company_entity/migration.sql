/*
  Warnings:

  - Added the required column `name` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "name" TEXT NOT NULL;
