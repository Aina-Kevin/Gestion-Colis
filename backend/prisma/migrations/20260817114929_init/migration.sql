-- DropIndex
DROP INDEX `Envoyer_idvoit_fkey` ON `envoyer`;

-- DropIndex
DROP INDEX `Voiture_codeit_fkey` ON `voiture`;

-- AddForeignKey
ALTER TABLE `Voiture` ADD CONSTRAINT `Voiture_codeit_fkey` FOREIGN KEY (`codeit`) REFERENCES `Itineraire`(`codeit`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Envoyer` ADD CONSTRAINT `Envoyer_idvoit_fkey` FOREIGN KEY (`idvoit`) REFERENCES `Voiture`(`idvoit`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recevoir` ADD CONSTRAINT `Recevoir_idenvoi_fkey` FOREIGN KEY (`idenvoi`) REFERENCES `Envoyer`(`idenvoi`) ON DELETE RESTRICT ON UPDATE CASCADE;
