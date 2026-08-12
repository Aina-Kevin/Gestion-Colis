// itineraire.routes.js
const express = require("express");
const router = express.Router();
const itineraireController = require("../controllers/itineraire.controller");

// GET tous les itinéraires
router.get("/", itineraireController.getAll);

// GET un itinéraire par ID
router.get("/:id", itineraireController.getById);

// POST créer un itinéraire
router.post("/", itineraireController.create);

// PUT modifier un itinéraire
router.put("/:id", itineraireController.update);

// DELETE supprimer un itinéraire
router.delete("/:id", itineraireController.remove);

module.exports = router;
