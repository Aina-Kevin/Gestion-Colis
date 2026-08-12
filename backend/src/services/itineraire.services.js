const prisma = require("../config/database");

// ==========================================
// RÉCUPÉRER TOUS LES ITINÉRAIRES
// ==========================================

const getAll = async () => {
  return await prisma.itineraire.findMany({
    orderBy: {
      codeit: "asc",
    },
  });
};

// ==========================================
// RECHERCHER UN ITINÉRAIRE
// ==========================================

const rechercher = async (q) => {
  return await prisma.itineraire.findMany({
    where: {
      OR: [
        {
          codeit: {
            contains: q,
          },
        },
        {
          villedep: {
            contains: q,
          },
        },
        {
          villearr: {
            contains: q,
          },
        },
      ],
    },
    orderBy: {
      codeit: "asc",
    },
  });
};

// ==========================================
// RÉCUPÉRER UN ITINÉRAIRE PAR CODE
// ==========================================

const getById = async (codeit) => {
  return await prisma.itineraire.findUnique({
    where: {
      codeit: codeit,
    },
  });
};

// ==========================================
// CRÉER UN ITINÉRAIRE
// ==========================================

const create = async ({ codeit, villedep, villearr }) => {
  return await prisma.itineraire.create({
    data: {
      codeit,
      villedep,
      villearr,
    },
  });
};

// ==========================================
// MODIFIER UN ITINÉRAIRE
// ==========================================

const update = async (codeit, { villedep, villearr }) => {
  return await prisma.itineraire.update({
    where: {
      codeit,
    },
    data: {
      villedep,
      villearr,
    },
  });
};

// ==========================================
// SUPPRIMER UN ITINÉRAIRE
// ==========================================

const remove = async (codeit) => {
  return await prisma.itineraire.delete({
    where: {
      codeit,
    },
  });
};

// ==========================================
// RÉCUPÉRER UN ITINÉRAIRE AVEC SES VOITURES
// ==========================================

const getWithVoitures = async (codeit) => {
  return await prisma.itineraire.findUnique({
    where: {
      codeit,
    },
    include: {
      voitures: true,
    },
  });
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
