const express = require("express");

const itineraireRoutes = require("./routes/itineraire.routes");
const voitureRoutes = require("./routes/voiture.routes");

const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());

app.use("/api/itineraires", itineraireRoutes);
app.use("/api/voitures", voitureRoutes);

app.use(errorMiddleware);

module.exports = app;
