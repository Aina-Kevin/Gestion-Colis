const express = require("express");

const router = express.Router();

const voitureController = require("../controllers/voiture.controller");

// Liste
router.get("/", voitureController.getAll);

// Recherche
// IMPORTANT : avant /:id
router.get("/recherche", voitureController.rechercher);

// Une voiture
router.get("/:id", voitureController.getById);

// Ajouter
router.post("/", voitureController.create);

// Modifier
router.put("/:id", voitureController.update);

// Supprimer
router.delete("/:id", voitureController.remove);

module.exports = router;
