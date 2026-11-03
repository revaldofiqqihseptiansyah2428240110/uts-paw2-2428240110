// Mengisi data awal: 3 hotel (referencing) + 6 kamar (dengan fasilitas embedded)
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Hotel = require("./models/hotel");
const Room = require("./models/room");

async function seed() {
  await connectDB();
  await Room.deleteMany({});
  await Hotel.deleteMany({});

  const hotels = await Hotel.insertMany([
    { nama: "Hotel Bahari", alamat: "Jl. Merdeka 10, Palembang", bintang: 4, noHp: "0711-123456" },
    { nama: "Grand Ampera", alamat: "Jl. Sudirman 5, Palembang", bintang: 5, noHp: "0711-654321" },
    { nama: "Hotel Rafflesia", alamat: "Jl. Demang 3, Palembang", bintang: 3, noHp: "0711-789012" },
  ]);

  await Room.insertMany([
    { nomorKamar: "101", tipe: "standar", hargaPerMalam: 350000, kapasitas: 2, tersedia: true,
      fasilitas: [{ nama: "TV", jumlah: 1 }, { nama: "Air mineral", jumlah: 2 }], hotel: hotels[0]._id },
    { nomorKamar: "102", tipe: "standar", hargaPerMalam: 375000, kapasitas: 2, tersedia: true,
      fasilitas: [{ nama: "TV", jumlah: 1 }], hotel: hotels[0]._id },
    { nomorKamar: "305", tipe: "deluxe", hargaPerMalam: 850000, kapasitas: 2, tersedia: true,
      fasilitas: [{ nama: "AC", jumlah: 1 }, { nama: "Smart TV", jumlah: 1 }, { nama: "Sarapan", jumlah: 2 }], hotel: hotels[1]._id },
    { nomorKamar: "306", tipe: "deluxe", hargaPerMalam: 900000, kapasitas: 3, tersedia: false,
      fasilitas: [{ nama: "AC", jumlah: 1 }, { nama: "Bathtub", jumlah: 1 }], hotel: hotels[1]._id },
    { nomorKamar: "401", tipe: "suite", hargaPerMalam: 1500000, kapasitas: 4, tersedia: true,
      fasilitas: [{ nama: "AC", jumlah: 2 }, { nama: "Balkon", jumlah: 1 }, { nama: "Minibar", jumlah: 1 }], hotel: hotels[1]._id },
    { nomorKamar: "402", tipe: "suite", hargaPerMalam: 1750000, kapasitas: 5, tersedia: true,
      fasilitas: [{ nama: "Kolam pribadi", jumlah: 1 }], hotel: hotels[2]._id },
  ]);

  console.log("Seeding selesai: 3 hotel, 6 kamar");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});