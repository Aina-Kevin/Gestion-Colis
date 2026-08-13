const prisma = require("../config/database");

// ==========================================
// RECETTE TOTALE
// ==========================================

const getRecetteTotale = async () => {
  const result = await prisma.envoyer.aggregate({
    _sum: {
      frais: true,
    },
    _count: {
      idenvoi: true,
    },
  });

  return {
    nombreEnvois: result._count.idenvoi,
    recetteTotale: result._sum.frais || 0,
  };
};

// ==========================================
// STATISTIQUES GENERALES
// ==========================================

const getStatistiques = async () => {
  const totalEnvois = await prisma.envoyer.count();

  const totalReceptions = await prisma.recevoir.count();

  const recette = await prisma.envoyer.aggregate({
    _sum: {
      frais: true,
    },
  });

  const colisEnTransit = totalEnvois - totalReceptions;

  return {
    totalEnvois,
    totalReceptions,
    colisEnTransit,
    recetteTotale: recette._sum.frais || 0,
  };
};

// ==========================================
// RECETTE PAR VOITURE
// ==========================================

const getRecetteParVoiture = async (idvoit) => {
  const voiture = await prisma.voiture.findUnique({
    where: {
      idvoit,
    },
    include: {
      itineraire: true,
    },
  });

  if (!voiture) {
    return null;
  }

  const result = await prisma.envoyer.aggregate({
    where: {
      idvoit,
    },
    _sum: {
      frais: true,
    },
    _count: {
      idenvoi: true,
    },
  });

  return {
    voiture: {
      idvoit: voiture.idvoit,
      design: voiture.design,
    },

    itineraire: voiture.itineraire,

    nombreEnvois: result._count.idenvoi,

    recetteTotale: result._sum.frais || 0,
  };
};

// ==========================================
// RECETTE PAR ITINERAIRE
// ==========================================

const getRecetteParItineraire = async (codeit) => {
  const itineraire = await prisma.itineraire.findUnique({
    where: {
      codeit,
    },
    include: {
      voitures: true,
    },
  });

  if (!itineraire) {
    return null;
  }

  const result = await prisma.envoyer.aggregate({
    where: {
      voiture: {
        codeit,
      },
    },
    _sum: {
      frais: true,
    },
    _count: {
      idenvoi: true,
    },
  });

  return {
    itineraire: {
      codeit: itineraire.codeit,
      villedep: itineraire.villedep,
      villearr: itineraire.villearr,
    },

    nombreVoitures: itineraire.voitures.length,

    nombreEnvois: result._count.idenvoi,

    recetteTotale: result._sum.frais || 0,
  };
};

module.exports = {
  getRecetteTotale,
  getStatistiques,
  getRecetteParVoiture,
  getRecetteParItineraire,
};
