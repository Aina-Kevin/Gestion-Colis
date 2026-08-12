const prisma = require("../config/database");

// ==========================================
// Récupérer tous les envois
// ==========================================

const getAll = async () => {
  return await prisma.envoyer.findMany({
    include: {
      voiture: {
        include: {
          itineraire: true,
        },
      },
      reception: true,
    },
    orderBy: {
      idenvoi: "desc",
    },
  });
};

// ==========================================
// Récupérer un envoi par son ID
// ==========================================

const getById = async (idenvoi) => {
  return await prisma.envoyer.findUnique({
    where: {
      idenvoi: Number(idenvoi),
    },
    include: {
      voiture: {
        include: {
          itineraire: true,
        },
      },
      reception: true,
    },
  });
};

// ==========================================
// Rechercher un envoi
// ==========================================

const rechercher = async (q) => {
  return await prisma.envoyer.findMany({
    where: {
      OR: [
        {
          colis: {
            contains: q,
          },
        },
        {
          nomEnvoyeur: {
            contains: q,
          },
        },
        {
          emailEnvoyeur: {
            contains: q,
          },
        },
        {
          nomRecepteur: {
            contains: q,
          },
        },
        {
          contactRecepteur: {
            contains: q,
          },
        },
        {
          idvoit: {
            contains: q,
          },
        },
      ],
    },
    include: {
      voiture: {
        include: {
          itineraire: true,
        },
      },
      reception: true,
    },
    orderBy: {
      idenvoi: "desc",
    },
  });
};

// ==========================================
// Créer un envoi
// ==========================================

const create = async ({
  idvoit,
  colis,
  nomEnvoyeur,
  emailEnvoyeur,
  date_envoi,
  frais,
  nomRecepteur,
  contactRecepteur,
}) => {
  return await prisma.envoyer.create({
    data: {
      idvoit,
      colis,
      nomEnvoyeur,
      emailEnvoyeur,
      date_envoi: new Date(date_envoi),
      frais: Number(frais),
      nomRecepteur,
      contactRecepteur,
    },
    include: {
      voiture: {
        include: {
          itineraire: true,
        },
      },
    },
  });
};

// ==========================================
// Modifier un envoi
// ==========================================

const update = async (
  idenvoi,
  {
    idvoit,
    colis,
    nomEnvoyeur,
    emailEnvoyeur,
    date_envoi,
    frais,
    nomRecepteur,
    contactRecepteur,
  },
) => {
  return await prisma.envoyer.update({
    where: {
      idenvoi: Number(idenvoi),
    },
    data: {
      idvoit,
      colis,
      nomEnvoyeur,
      emailEnvoyeur,
      date_envoi: new Date(date_envoi),
      frais: Number(frais),
      nomRecepteur,
      contactRecepteur,
    },
    include: {
      voiture: {
        include: {
          itineraire: true,
        },
      },
      reception: true,
    },
  });
};

// ==========================================
// Supprimer un envoi
// ==========================================

const remove = async (idenvoi) => {
  return await prisma.envoyer.delete({
    where: {
      idenvoi: Number(idenvoi),
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
