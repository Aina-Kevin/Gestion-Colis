const express = require("express");

const router = express.Router();

const envoyerController = require("../controllers/envoyer.controller");

// Tous les envois
router.get("/", envoyerController.getAll);

// Recherche
// IMPORTANT : avant /:id
router.get("/recherche", envoyerController.rechercher);

// Un envoi
router.get("/:id", envoyerController.getById);

// Ajouter
router.post("/", envoyerController.create);

// Modifier
router.put("/:id", envoyerController.update);

// Supprimer
router.delete("/:id", envoyerController.remove);

module.exports = router;
