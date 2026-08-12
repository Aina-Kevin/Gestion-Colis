const { PrismaClient } = require("@prisma/client");

// Évite de créer plusieurs instances de PrismaClient en développement
// (problème classique avec nodemon qui redémarre le serveur en boucle)
let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ["query", "info", "warn", "error"], // logs utiles en dev
    });
  }
  prisma = global.prisma;
}

module.exports = prisma;
