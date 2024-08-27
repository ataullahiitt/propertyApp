-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NULL,
    `mobileNumber` VARCHAR(191) NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `status` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Users_uuid_key`(`uuid`),
    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Properties` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `rentAgreementDate` DATE NOT NULL,
    `type` ENUM('Flat') NOT NULL DEFAULT 'Flat',
    `landLoadFullName` VARCHAR(191) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `mobileNumber` VARCHAR(15) NOT NULL,
    `bankAccountNumber` VARCHAR(191) NOT NULL,
    `bankName` VARCHAR(150) NOT NULL,
    `bankAddress` VARCHAR(255) NOT NULL,
    `paymentSchedule` VARCHAR(191) NOT NULL,
    `rentAmount` DECIMAL(10, 2) NOT NULL,
    `IFSCcode` VARCHAR(10) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Properties_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
