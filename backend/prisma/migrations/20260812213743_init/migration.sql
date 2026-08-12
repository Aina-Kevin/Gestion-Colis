-- CreateTable
CREATE TABLE `Itineraire` (
    `codeit` VARCHAR(191) NOT NULL,
    `villedep` VARCHAR(191) NOT NULL,
    `villearr` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`codeit`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Voiture` (
    `idvoit` VARCHAR(191) NOT NULL,
    `design` VARCHAR(191) NOT NULL,
    `codeit` VARCHAR(191) NOT NULL,
    `frais` INTEGER NOT NULL,

    PRIMARY KEY (`idvoit`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Envoyer` (
    `idenvoi` INTEGER NOT NULL AUTO_INCREMENT,
    `idvoit` VARCHAR(191) NOT NULL,
    `colis` VARCHAR(191) NOT NULL,
    `nomEnvoyeur` VARCHAR(191) NOT NULL,
    `emailEnvoyeur` VARCHAR(191) NOT NULL,
    `date_envoi` DATETIME(3) NOT NULL,
    `frais` INTEGER NOT NULL,
    `nomRecepteur` VARCHAR(191) NOT NULL,
    `contactRecepteur` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idenvoi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recevoir` (
    `idrecept` INTEGER NOT NULL AUTO_INCREMENT,
    `idenvoi` INTEGER NOT NULL,
    `date_recept` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Recevoir_idenvoi_key`(`idenvoi`),
    PRIMARY KEY (`idrecept`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Voiture` ADD CONSTRAINT `Voiture_codeit_fkey` FOREIGN KEY (`codeit`) REFERENCES `Itineraire`(`codeit`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Envoyer` ADD CONSTRAINT `Envoyer_idvoit_fkey` FOREIGN KEY (`idvoit`) REFERENCES `Voiture`(`idvoit`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recevoir` ADD CONSTRAINT `Recevoir_idenvoi_fkey` FOREIGN KEY (`idenvoi`) REFERENCES `Envoyer`(`idenvoi`) ON DELETE RESTRICT ON UPDATE CASCADE;
