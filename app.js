// Topik 8: Hotel - Kamar
// Nama : Revaldo Fiqqih Septiansyah
// NPM  : 2428240110

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const roomRoutes = require("./routes/fotograferRoutes");
const hotelRoutes = require("./routes/sesifotoRoutes");
const logger = require("./middlewares/logger");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(logger);
app.use(express.json());

app.use("/sesifoto", sesifotoRoutes);
app.use("/fotografer", fotograferRoutes);

app.use(notFound);
app.use(errorHandler);

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () =>
    console.log(`Server berjalan di http://localhost:${PORT}`)
  );
}

module.exports = app;