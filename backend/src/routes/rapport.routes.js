const express = require("express");

const router = express.Router();

const rapportController = require("../controllers/rapport.controller");

// ==========================================
// RECETTE TOTALE
// ==========================================

router.get("/recette", rapportController.getRecetteTotale);

// ==========================================
// STATISTIQUES GENERALES
// ==========================================

router.get("/statistiques", rapportController.getStatistiques);

// ==========================================
// RECETTE PAR VOITURE
// ==========================================

router.get("/recette/voiture/:idvoit", rapportController.getRecetteParVoiture);

// ==========================================
// RECETTE PAR ITINERAIRE
// ==========================================

router.get(
  "/recette/itineraire/:codeit",
  rapportController.getRecetteParItineraire,
);

module.exports = router;
