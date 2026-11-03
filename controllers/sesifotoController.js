// Controller Hotel (target referencing dari Room)
const Hotel = require("../models/hotel");

// GET /hotels
exports.getAllHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find().sort("nama");
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

// GET /hotels/:id
exports.getHotelById = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({
        status: "error",
        message: `Hotel dengan id ${req.params.id} tidak ditemukan`,
        data: null,
      });
    }
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

// POST /hotels
exports.createHotel = async (req, res, next) => {
  try {
    const { nama, alamat, bintang, noHp } = req.body;
    if (!nama || !alamat) {
      return res.status(400).json({
        status: "error",
        message: "Field nama dan alamat wajib diisi",
        data: null,
      });
    }
    const hotel = await Hotel.create({ nama, alamat, bintang, noHp });
    res.status(201).json({
      status: "success",
      message: "Data berhasil ditambahkan",
      data: hotel,
    });
  } catch (err) {
    next(err);
  }
};

// PUT /hotels/:id
exports.updateHotel = async (req, res, next) => {
  try {
    const { nama, alamat, bintang, noHp } = req.body;
    if (!nama || !alamat) {
      return res.status(400).json({
        status: "error",
        message: "Field nama dan alamat wajib diisi",
        data: null,
      });
    }
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { nama, alamat, bintang, noHp },
      { new: true, runValidators: true }
    );
    if (!hotel) {
      return res.status(404).json({
        status: "error",
        message: `Hotel dengan id ${req.params.id} tidak ditemukan`,
        data: null,
      });
    }
    res.status(200).json({
      status: "success",
      message: "Data berhasil diubah",
      data: hotel,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /hotels/:id
exports.deleteHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) {
      return res.status(404).json({
        status: "error",
        message: `Hotel dengan id ${req.params.id} tidak ditemukan`,
        data: null,
      });
    }
    res.status(200).json({
      status: "success",
      message: `Data hotel dengan id ${req.params.id} berhasil dihapus`,
      data: null,
    });
  } catch (err) {
    next(err);
  }
};