const express = require("express");

const router = express.Router();

const itineraireController = require("../controllers/itineraire.controller");

// Récupérer tous les itinéraires
router.get("/", itineraireController.getAll);

// Rechercher un itinéraire
// IMPORTANT : avant /:codeit
router.get("/recherche", itineraireController.rechercher);

// Récupérer un itinéraire avec ses voitures
router.get("/:codeit/voitures", itineraireController.getWithVoitures);

// Récupérer un itinéraire
router.get("/:codeit", itineraireController.getById);

// Créer un itinéraire
router.post("/", itineraireController.create);

// Modifier un itinéraire
router.put("/:codeit", itineraireController.update);

// Supprimer un itinéraire
router.delete("/:codeit", itineraireController.remove);

module.exports = router;
