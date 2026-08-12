const envoyerService = require("../services/envoyer.services");

// ==========================================
// GET /api/envois
// ==========================================

const getAll = async (req, res, next) => {
  try {
    const envois = await envoyerService.getAll();

    res.status(200).json(envois);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// GET /api/envois/recherche?q=...
// ==========================================

const rechercher = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({
        message: "Le paramètre q est obligatoire",
      });
    }

    const envois = await envoyerService.rechercher(q.trim());

    res.status(200).json(envois);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// GET /api/envois/:id
// ==========================================

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const envoi = await envoyerService.getById(id);

    if (!envoi) {
      return res.status(404).json({
        message: "Envoi introuvable",
      });
    }

    res.status(200).json(envoi);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// POST /api/envois
// ==========================================

const create = async (req, res, next) => {
  try {
    const {
      idvoit,
      colis,
      nomEnvoyeur,
      emailEnvoyeur,
      date_envoi,
      frais,
      nomRecepteur,
      contactRecepteur,
    } = req.body;

    if (
      !idvoit ||
      !colis ||
      !nomEnvoyeur ||
      !emailEnvoyeur ||
      !date_envoi ||
      frais === undefined ||
      !nomRecepteur ||
      !contactRecepteur
    ) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires",
      });
    }

    const envoi = await envoyerService.create({
      idvoit,
      colis,
      nomEnvoyeur,
      emailEnvoyeur,
      date_envoi,
      frais,
      nomRecepteur,
      contactRecepteur,
    });

    res.status(201).json(envoi);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// PUT /api/envois/:id
// ==========================================

const update = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      idvoit,
      colis,
      nomEnvoyeur,
      emailEnvoyeur,
      date_envoi,
      frais,
      nomRecepteur,
      contactRecepteur,
    } = req.body;

    if (
      !idvoit ||
      !colis ||
      !nomEnvoyeur ||
      !emailEnvoyeur ||
      !date_envoi ||
      frais === undefined ||
      !nomRecepteur ||
      !contactRecepteur
    ) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires",
      });
    }

    const envoiExistant = await envoyerService.getById(id);

    if (!envoiExistant) {
      return res.status(404).json({
        message: "Envoi introuvable",
      });
    }

    const envoi = await envoyerService.update(id, {
      idvoit,
      colis,
      nomEnvoyeur,
      emailEnvoyeur,
      date_envoi,
      frais,
      nomRecepteur,
      contactRecepteur,
    });

    res.status(200).json(envoi);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// DELETE /api/envois/:id
// ==========================================

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const envoiExistant = await envoyerService.getById(id);

    if (!envoiExistant) {
      return res.status(404).json({
        message: "Envoi introuvable",
      });
    }

    await envoyerService.remove(id);

    res.status(200).json({
      message: "Envoi supprimé avec succès",
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
