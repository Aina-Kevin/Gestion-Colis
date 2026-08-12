const itineraireService = require("../services/itineraire.services");

// ==========================================
// GET /api/itineraires
// ==========================================

const getAll = async (req, res, next) => {
  try {
    const itineraires = await itineraireService.getAll();

    res.status(200).json(itineraires);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// GET /api/itineraires/recherche?q=...
// ==========================================

const rechercher = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({
        message: "Le terme de recherche est obligatoire",
      });
    }

    const itineraires = await itineraireService.rechercher(q.trim());

    res.status(200).json(itineraires);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// GET /api/itineraires/:codeit
// ==========================================

const getById = async (req, res, next) => {
  try {
    const { codeit } = req.params;

    const itineraire = await itineraireService.getById(codeit);

    if (!itineraire) {
      return res.status(404).json({
        message: "Itinéraire introuvable",
      });
    }

    res.status(200).json(itineraire);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// POST /api/itineraires
// ==========================================

const create = async (req, res, next) => {
  try {
    const { codeit, villedep, villearr } = req.body;

    if (!codeit || !villedep || !villearr) {
      return res.status(400).json({
        message: "codeit, villedep et villearr sont obligatoires",
      });
    }

    const itineraire = await itineraireService.create({
      codeit,
      villedep,
      villearr,
    });

    res.status(201).json({
      message: "Itinéraire créé avec succès",
      itineraire,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// PUT /api/itineraires/:codeit
// ==========================================

const update = async (req, res, next) => {
  try {
    const { codeit } = req.params;

    const { villedep, villearr } = req.body;

    if (!villedep || !villearr) {
      return res.status(400).json({
        message: "villedep et villearr sont obligatoires",
      });
    }

    const itineraire = await itineraireService.update(codeit, {
      villedep,
      villearr,
    });

    res.status(200).json({
      message: "Itinéraire modifié avec succès",
      itineraire,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// DELETE /api/itineraires/:codeit
// ==========================================

const remove = async (req, res, next) => {
  try {
    const { codeit } = req.params;

    await itineraireService.remove(codeit);

    res.status(200).json({
      message: "Itinéraire supprimé avec succès",
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// GET /api/itineraires/:codeit/voitures
// ==========================================

const getWithVoitures = async (req, res, next) => {
  try {
    const { codeit } = req.params;

    const itineraire = await itineraireService.getWithVoitures(codeit);

    if (!itineraire) {
      return res.status(404).json({
        message: "Itinéraire introuvable",
      });
    }

    res.status(200).json(itineraire);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  rechercher,
  getById,
  create,
  update,
  remove,
  getWithVoitures,
};
