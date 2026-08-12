const prisma = require("../config/database");

// ==========================================
// Récupérer toutes les réceptions
// ==========================================

const getAll = async () => {
  return await prisma.recevoir.findMany({
    include: {
      envoyer: {
        include: {
          voiture: {
            include: {
              itineraire: true,
            },
          },
        },
      },
    },
    orderBy: {
      idrecept: "desc",
    },
  });
};

// ==========================================
// Récupérer une réception par ID
// ==========================================

const getById = async (idrecept) => {
  return await prisma.recevoir.findUnique({
    where: {
      idrecept: Number(idrecept),
    },
    include: {
      envoyer: {
        include: {
          voiture: {
            include: {
              itineraire: true,
            },
          },
        },
      },
    },
  });
};

// ==========================================
// Rechercher une réception
// ==========================================

const rechercher = async (q) => {
  const receptions = await prisma.recevoir.findMany({
    include: {
      envoyer: {
        include: {
          voiture: {
            include: {
              itineraire: true,
            },
          },
        },
      },
    },
    orderBy: {
      idrecept: "desc",
    },
  });

  const recherche = q.toLowerCase();

  return receptions.filter((reception) => {
    const envoyer = reception.envoyer;

    return (
      String(reception.idrecept).includes(recherche) ||
      String(reception.idenvoi).includes(recherche) ||
      envoyer.colis.toLowerCase().includes(recherche) ||
      envoyer.nomEnvoyeur.toLowerCase().includes(recherche) ||
      envoyer.nomRecepteur.toLowerCase().includes(recherche) ||
      envoyer.contactRecepteur.toLowerCase().includes(recherche) ||
      envoyer.idvoit.toLowerCase().includes(recherche)
    );
  });
};

// ==========================================
// Créer une réception
// ==========================================

const create = async ({ idenvoi, date_recept }) => {
  return await prisma.recevoir.create({
    data: {
      idenvoi: Number(idenvoi),
      date_recept: new Date(date_recept),
    },
    include: {
      envoyer: {
        include: {
          voiture: {
            include: {
              itineraire: true,
            },
          },
        },
      },
    },
  });
};

// ==========================================
// Modifier une réception
// ==========================================

const update = async (idrecept, { idenvoi, date_recept }) => {
  return await prisma.recevoir.update({
    where: {
      idrecept: Number(idrecept),
    },
    data: {
      idenvoi: Number(idenvoi),
      date_recept: new Date(date_recept),
    },
    include: {
      envoyer: {
        include: {
          voiture: {
            include: {
              itineraire: true,
            },
          },
        },
      },
    },
  });
};

// ==========================================
// Supprimer une réception
// ==========================================

const remove = async (idrecept) => {
  return await prisma.recevoir.delete({
    where: {
      idrecept: Number(idrecept),
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
