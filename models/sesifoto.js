// Schema Room - memakai EMBEDDING (fasilitas) dan REFERENCING (hotel)
const mongoose = require("mongoose");

// subdokumen yang tertanam di dalam Room (EMBEDDING)
// fasilitas selalu dibaca bersama kamar, jadi paling efisien ditanam
const fasilitasSchema = new mongoose.Schema(
  {
    nama: { type: String, required: true },
    jumlah: { type: Number, default: 1 },
  },
  { _id: false }
);

const roomSchema = new mongoose.Schema(
  {
    nomorKamar: { type: String, required: true },
    tipe: {
      type: String,
      enum: ["standar", "deluxe", "suite"],
      required: true,
    },
    hargaPerMalam: { type: Number, required: true },
    kapasitas: { type: Number, required: true },
    tersedia: { type: Boolean, default: true },
    // EMBEDDING: array subdokumen fasilitas ada di dalam dokumen kamar
    fasilitas: [fasilitasSchema],
    // REFERENCING: kamar menunjuk dokumen Hotel lain lewat ObjectId
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);