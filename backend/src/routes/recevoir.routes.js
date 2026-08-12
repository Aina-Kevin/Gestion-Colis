const express = require("express");

const router = express.Router();

const recevoirController = require("../controllers/recevoir.controller");

// Toutes les réceptions
router.get("/", recevoirController.getAll);

// Recherche
// IMPORTANT : avant /:id
router.get("/recherche", recevoirController.rechercher);

// Une réception
router.get("/:id", recevoirController.getById);

// Ajouter une réception
router.post("/", recevoirController.create);

// Modifier
router.put("/:id", recevoirController.update);

// Supprimer
router.delete("/:id", recevoirController.remove);

module.exports = router;
