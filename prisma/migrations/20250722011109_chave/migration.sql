-- AlterTable
ALTER TABLE `task` ADD COLUMN `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
