const itineraireService = require("../services/itineraire.service");

// GET /api/itineraires
exports.getAll = async (req, res, next) => {
  try {
    const itineraires = await itineraireService.getAllItineraires();
    res.status(200).json(itineraires);
  } catch (err) {
    next(err);
  }
};

// GET /api/itineraires/:id
exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const itineraire = await itineraireService.getItineraireById(id);

    if (!itineraire) {
      return res.status(404).json({ message: "Itinéraire introuvable" });
    }

    res.status(200).json(itineraire);
  } catch (err) {
    next(err);
  }
};

// POST /api/itineraires
exports.create = async (req, res, next) => {
  try {
    const { villeDepart, villeArrivee, distanceKm, dureeEstimee, prix } =
      req.body;

    // Validation basique
    if (!villeDepart || !villeArrivee || !prix) {
      return res.status(400).json({
        message: "villeDepart, villeArrivee et prix sont obligatoires",
      });
    }

    const nouvelItineraire = await itineraireService.createItineraire({
      villeDepart,
      villeArrivee,
      distanceKm,
      dureeEstimee,
      prix,
    });

    res.status(201).json(nouvelItineraire);
  } catch (err) {
    next(err);
  }
};

// PUT /api/itineraires/:id
exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const itineraireExistant = await itineraireService.getItineraireById(id);
    if (!itineraireExistant) {
      return res.status(404).json({ message: "Itinéraire introuvable" });
    }

    const itineraireModifie = await itineraireService.updateItineraire(
      id,
      data,
    );
    res.status(200).json(itineraireModifie);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/itineraires/:id
exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const itineraireExistant = await itineraireService.getItineraireById(id);
    if (!itineraireExistant) {
      return res.status(404).json({ message: "Itinéraire introuvable" });
    }

    await itineraireService.deleteItineraire(id);
    res.status(204).send(); // pas de contenu à renvoyer
  } catch (err) {
    next(err);
  }
};

// GET /api/itineraires/recherche?depart=Fianarantsoa&arrivee=Antananarivo
exports.rechercher = async (req, res, next) => {
  try {
    const { depart, arrivee } = req.query;

    if (!depart || !arrivee) {
      return res.status(400).json({
        message: "Paramètres depart et arrivee requis",
      });
    }

    const resultats = await itineraireService.rechercherItineraire(
      depart,
      arrivee,
    );
    res.status(200).json(resultats);
  } catch (err) {
    next(err);
  }
};
