// Schema Room - memakai EMBEDDING (fasilitas) dan REFERENCING (hotel)
const mongoose = require("mongoose");

// subdokumen yang tertanam di dalam Room (EMBEDDING)
// fasilitas selalu dibaca bersama kamar, jadi paling efisien ditanam
const tempatSchema = new mongoose.Schema(
  {
    lokasi: { type: String, required: true },
  },
  { _id: false }
);

const roomSchema = new mongoose.Schema(
  {
    kodeSesi: { type: String, required: true },
    namaKlien: { type: String, required: true },
    durasiJam: { type: Number, required: true },
    paket: {
      type: String,
      enum: ["personal", "keluarga", "prewedding"],
      required: true,
    },
    // EMBEDDING: array subdokumen fasilitas ada di dalam dokumen kamar
    fasilitas: [tempatSchema],
    // REFERENCING: kamar menunjuk dokumen Hotel lain lewat ObjectId
    fotografer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fotografer",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sesifoto", sesifotoSchema);