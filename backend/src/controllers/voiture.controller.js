const voitureService = require("../services/voiture.services");

// ==========================================
// GET /api/voitures
// ==========================================

const getAll = async (req, res, next) => {
  try {
    const voitures = await voitureService.getAll();

    res.status(200).json(voitures);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// GET /api/voitures/recherche?q=...
// ==========================================

const rechercher = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({
        message: "Le paramètre de recherche q est obligatoire",
      });
    }

    const voitures = await voitureService.rechercher(q);

    res.status(200).json(voitures);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// GET /api/voitures/:id
// ==========================================

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const voiture = await voitureService.getById(id);

    if (!voiture) {
      return res.status(404).json({
        message: "Voiture introuvable",
      });
    }

    res.status(200).json(voiture);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// POST /api/voitures
// ==========================================

const create = async (req, res, next) => {
  try {
    const { idvoit, design, codeit, frais } = req.body;

    if (!idvoit || !design || !codeit || frais === undefined) {
      return res.status(400).json({
        message: "idvoit, design, codeit et frais sont obligatoires",
      });
    }

    const voiture = await voitureService.create({
      idvoit,
      design,
      codeit,
      frais,
    });

    res.status(201).json(voiture);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// PUT /api/voitures/:id
// ==========================================

const update = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { design, codeit, frais } = req.body;

    if (!design || !codeit || frais === undefined) {
      return res.status(400).json({
        message: "design, codeit et frais sont obligatoires",
      });
    }

    const voitureExistante = await voitureService.getById(id);

    if (!voitureExistante) {
      return res.status(404).json({
        message: "Voiture introuvable",
      });
    }

    const voiture = await voitureService.update(id, {
      design,
      codeit,
      frais,
    });

    res.status(200).json(voiture);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// DELETE /api/voitures/:id
// ==========================================

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const voitureExistante = await voitureService.getById(id);

    if (!voitureExistante) {
      return res.status(404).json({
        message: "Voiture introuvable",
      });
    }

    await voitureService.remove(id);

    res.status(200).json({
      message: "Voiture supprimée avec succès",
    });
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
};
