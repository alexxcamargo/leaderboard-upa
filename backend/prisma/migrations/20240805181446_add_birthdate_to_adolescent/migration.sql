/*
  Warnings:

  - Added the required column `birthdate` to the `Adolescent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Adolescent` ADD COLUMN `birthdate` DATETIME(3) NOT NULL;
