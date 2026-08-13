const rapportService = require("../services/rapport.services");

// ==========================================
// GET /api/rapports/recette
// ==========================================

const getRecetteTotale = async (req, res, next) => {
  try {
    const rapport = await rapportService.getRecetteTotale();

    res.status(200).json(rapport);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// GET /api/rapports/statistiques
// ==========================================

const getStatistiques = async (req, res, next) => {
  try {
    const statistiques = await rapportService.getStatistiques();

    res.status(200).json(statistiques);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// GET /api/rapports/recette/voiture/:idvoit
// ==========================================

const getRecetteParVoiture = async (req, res, next) => {
  try {
    const { idvoit } = req.params;

    const rapport = await rapportService.getRecetteParVoiture(idvoit);

    if (!rapport) {
      return res.status(404).json({
        message: "Voiture introuvable",
      });
    }

    res.status(200).json(rapport);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// GET /api/rapports/recette/itineraire/:codeit
// ==========================================

const getRecetteParItineraire = async (req, res, next) => {
  try {
    const { codeit } = req.params;

    const rapport = await rapportService.getRecetteParItineraire(codeit);

    if (!rapport) {
      return res.status(404).json({
        message: "Itinéraire introuvable",
      });
    }

    res.status(200).json(rapport);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRecetteTotale,
  getStatistiques,
  getRecetteParVoiture,
  getRecetteParItineraire,
};
