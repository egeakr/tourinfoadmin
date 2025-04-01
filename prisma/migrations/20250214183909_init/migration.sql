-- CreateTable
CREATE TABLE `Location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `il` VARCHAR(191) NOT NULL,
    `ilce` VARCHAR(191) NOT NULL,
    `mahalle` VARCHAR(191) NOT NULL,
    `sokak` VARCHAR(191) NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `imageUrl` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
