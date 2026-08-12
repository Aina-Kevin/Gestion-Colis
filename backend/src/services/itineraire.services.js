// itineraire.service.js
const prisma = require("../config/database");

exports.getAllItineraires = () => {
  return prisma.itineraire.findMany();
};

exports.getItineraireById = (id) => {
  return prisma.itineraire.findUnique({ where: { id: Number(id) } });
};

exports.createItineraire = (data) => {
  return prisma.itineraire.create({ data });
};

exports.updateItineraire = (id, data) => {
  return prisma.itineraire.update({
    where: { id: Number(id) },
    data,
  });
};

exports.deleteItineraire = (id) => {
  return prisma.itineraire.delete({ where: { id: Number(id) } });
};

exports.rechercherItineraire = (depart, arrivee) => {
  return prisma.itineraire.findMany({
    where: {
      villeDepart: { contains: depart, mode: "insensitive" },
      villeArrivee: { contains: arrivee, mode: "insensitive" },
    },
  });
};
