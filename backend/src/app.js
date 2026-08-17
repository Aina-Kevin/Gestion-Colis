const express = require("express");
const cors = require("cors");

const itineraireRoutes = require("./routes/itineraire.routes");
const voitureRoutes = require("./routes/voiture.routes");
const envoyerRoutes = require("./routes/envoyer.routes");
const recevoirRoutes = require("./routes/recevoir.routes");
const rapportRoutes = require("./routes/rapport.routes");

const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/itineraires", itineraireRoutes);
app.use("/api/voitures", voitureRoutes);
app.use("/api/envois", envoyerRoutes);
app.use("/api/receptions", recevoirRoutes);
app.use("/api/rapports", rapportRoutes);

app.use(errorMiddleware);

module.exports = app;
