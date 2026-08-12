const express = require("express");

const itineraireRoutes = require("./routes/itineraire.routes");
const voitureRoutes = require("./routes/voiture.routes");
const envoyerRoutes = require("./routes/envoyer.routes");
const recevoirRoutes = require("./routes/recevoir.routes");

const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());

app.use("/api/itineraires", itineraireRoutes);
app.use("/api/voitures", voitureRoutes);
app.use("/api/envois", envoyerRoutes);
app.use("/api/receptions", recevoirRoutes);

app.use(errorMiddleware);

module.exports = app;
