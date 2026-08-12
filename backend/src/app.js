const express = require("express");

const itineraireRoutes = require("./routes/itineraire.routes");

const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());

app.use("/api/itineraires", itineraireRoutes);

app.use(errorMiddleware);

module.exports = app;
