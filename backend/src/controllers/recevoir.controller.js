const recevoirService = require("../services/recevoir.services");

// ==========================================
// GET /api/receptions
// ==========================================

const getAll = async (req, res, next) => {
  try {
    const receptions = await recevoirService.getAll();

    res.status(200).json(receptions);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// GET /api/receptions/recherche?q=...
// ==========================================

const rechercher = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({
        message: "Le paramètre q est obligatoire",
      });
    }

    const receptions = await recevoirService.rechercher(q.trim());

    res.status(200).json(receptions);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// GET /api/receptions/:id
// ==========================================

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const reception = await recevoirService.getById(id);

    if (!reception) {
      return res.status(404).json({
        message: "Réception introuvable",
      });
    }

    res.status(200).json(reception);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// POST /api/receptions
// ==========================================

const create = async (req, res, next) => {
  try {
    const { idenvoi, date_recept } = req.body;

    if (!idenvoi || !date_recept) {
      return res.status(400).json({
        message: "idenvoi et date_recept sont obligatoires",
      });
    }

    const reception = await recevoirService.create({
      idenvoi,
      date_recept,
    });

    res.status(201).json(reception);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// PUT /api/receptions/:id
// ==========================================

const update = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { idenvoi, date_recept } = req.body;

    if (!idenvoi || !date_recept) {
      return res.status(400).json({
        message: "idenvoi et date_recept sont obligatoires",
      });
    }

    const receptionExistante = await recevoirService.getById(id);

    if (!receptionExistante) {
      return res.status(404).json({
        message: "Réception introuvable",
      });
    }

    const reception = await recevoirService.update(id, {
      idenvoi,
      date_recept,
    });

    res.status(200).json(reception);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// DELETE /api/receptions/:id
// ==========================================

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const receptionExistante = await recevoirService.getById(id);

    if (!receptionExistante) {
      return res.status(404).json({
        message: "Réception introuvable",
      });
    }

    await recevoirService.remove(id);

    res.status(200).json({
      message: "Réception supprimée avec succès",
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
