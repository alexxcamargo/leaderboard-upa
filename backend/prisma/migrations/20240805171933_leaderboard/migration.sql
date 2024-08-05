-- CreateTable
CREATE TABLE `Adolescent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `points` INTEGER NOT NULL DEFAULT 0,
    `presences` INTEGER NOT NULL DEFAULT 0,
    `correctAnswers` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Presence` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `adolescentId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Presence` ADD CONSTRAINT `Presence_adolescentId_fkey` FOREIGN KEY (`adolescentId`) REFERENCES `Adolescent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
