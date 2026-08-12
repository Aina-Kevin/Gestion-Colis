const prisma = require("../config/database");

// ==========================================
// Récupérer toutes les voitures
// ==========================================

const getAll = async () => {
  return await prisma.voiture.findMany({
    include: {
      itineraire: true,
    },
    orderBy: {
      idvoit: "asc",
    },
  });
};

// ==========================================
// Récupérer une voiture par son ID
// ==========================================

const getById = async (idvoit) => {
  return await prisma.voiture.findUnique({
    where: {
      idvoit,
    },
    include: {
      itineraire: true,
    },
  });
};

// ==========================================
// Rechercher une voiture
// ==========================================

const rechercher = async (q) => {
  return await prisma.voiture.findMany({
    where: {
      OR: [
        {
          idvoit: {
            contains: q,
          },
        },
        {
          design: {
            contains: q,
          },
        },
        {
          codeit: {
            contains: q,
          },
        },
      ],
    },
    include: {
      itineraire: true,
    },
    orderBy: {
      idvoit: "asc",
    },
  });
};

// ==========================================
// Créer une voiture
// ==========================================

const create = async ({ idvoit, design, codeit, frais }) => {
  return await prisma.voiture.create({
    data: {
      idvoit,
      design,
      codeit,
      frais: Number(frais),
    },
    include: {
      itineraire: true,
    },
  });
};

// ==========================================
// Modifier une voiture
// ==========================================

const update = async (idvoit, { design, codeit, frais }) => {
  return await prisma.voiture.update({
    where: {
      idvoit,
    },
    data: {
      design,
      codeit,
      frais: Number(frais),
    },
    include: {
      itineraire: true,
    },
  });
};

// ==========================================
// Supprimer une voiture
// ==========================================

const remove = async (idvoit) => {
  return await prisma.voiture.delete({
    where: {
      idvoit,
    },
  });
};

module.exports = {
  getAll,
  getById,
  rechercher,
  create,
  update,
  remove,
};
