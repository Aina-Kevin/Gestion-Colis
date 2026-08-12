// itineraire.routes.js
const express = require("express");
const router = express.Router();
const itineraireController = require("../controllers/itineraire.controller");

router.get("/", itineraireController.getAll);
router.get("/recherche", itineraireController.rechercher); // ⚠️ AVANT /:id
router.get("/:id", itineraireController.getById);
router.post("/", itineraireController.create);
router.put("/:id", itineraireController.update);
router.delete("/:id", itineraireController.remove);

module.exports = router;
