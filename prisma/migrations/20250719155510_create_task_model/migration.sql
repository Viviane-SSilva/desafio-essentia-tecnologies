/*
  Warnings:

  - Added the required column `updateAt` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Task` ADD COLUMN `updateAt` DATETIME(3) NOT NULL;
