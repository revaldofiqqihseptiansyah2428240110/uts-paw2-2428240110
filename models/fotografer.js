// Schema Hotel - menjadi target REFERENCING dari Room
const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    nama: { type: String, required: true },
    alamat: { type: String, required: true },
    bintang: { type: Number, min: 1, max: 5, default: 3 },
    noHp: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema);