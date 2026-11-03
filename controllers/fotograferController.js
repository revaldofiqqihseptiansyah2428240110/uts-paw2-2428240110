// Controller Room dengan filtering, pagination, sorting, projection
const Room = require("../models/sesifoto");

// whitelist field agar sorting/projection tidak bisa disalahgunakan
const SORTABLE = ["nomorKamar", "tipe", "hargaPerMalam", "kapasitas", "createdAt"];
const PROJECTABLE = ["nomorKamar", "tipe", "hargaPerMalam", "kapasitas", "tersedia", "fasilitas", "hotel"];

// GET /rooms
// Query yang didukung:
//   filter     -> ?tipe=deluxe&tersedia=true&search=30
//   pagination -> ?page=1&limit=3
//   sorting    -> ?sort=hargaPerMalam&order=desc
//   projection -> ?fields=nomorKamar,tipe,hargaPerMalam
exports.getAllRooms = async (req, res, next) => {
  try {
    const { tipe, tersedia, search, page, limit, sort, order, fields } = req.query;

    // 1) FILTERING: bangun kondisi where dari query string
    const filter = {};
    if (tipe) filter.tipe = tipe;
    if (tersedia !== undefined) filter.tersedia = tersedia === "true";
    if (search) filter.nomorKamar = { $regex: search, $options: "i" };

    // 2) SORTING: hanya field dalam whitelist, default urut id
    const sortField = SORTABLE.includes(sort) ? sort : "_id";
    const sortOrder = order === "desc" ? -1 : 1;

    // 3) PROJECTION: pilih field yang dikembalikan (?fields=a,b)
    let select = null;
    if (fields) {
      select = fields
        .split(",")
        .filter((f) => PROJECTABLE.includes(f))
        .join(" ");
    }

    // 4) PAGINATION: hitung total & skip
    const pageNum = Math.max(parseInt(page) || 1, 1);
    const limitNum = Math.min(Math.max(parseInt(limit) || 10, 1), 50);

    const [rooms, total] = await Promise.all([
      Room.find(filter)
        .select(select)
        .populate("hotel", "nama bintang") // mengikuti ObjectId -> dokumen Hotel
        .sort({ [sortField]: sortOrder })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      Room.countDocuments(filter),
    ]);

    res.status(200).json({
      data: rooms,
      meta: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (err) {
    next(err);
  }
};

// GET /rooms/:id
exports.getRoomById = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id).populate("hotel", "nama alamat bintang");
    if (!room) {
      return res.status(404).json({
        status: "error",
        message: `Data dengan id ${req.params.id} tidak ditemukan`,
        data: null,
      });
    }
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

// POST /rooms
// Body contoh:
// {
//   "nomorKamar": "306", "tipe": "deluxe", "hargaPerMalam": 900000, "kapasitas": 3,
//   "fasilitas": [{ "nama": "AC", "jumlah": 1 }, { "nama": "TV", "jumlah": 2 }],
//   "hotel": "<ObjectId hotel>"
// }
exports.createRoom = async (req, res, next) => {
  try {
    const { nomorKamar, tipe, hargaPerMalam, kapasitas, tersedia, fasilitas, hotel } = req.body;

    if (!nomorKamar || !tipe || hargaPerMalam === undefined || !kapasitas || !hotel) {
      return res.status(400).json({
        status: "error",
        message: "Field nomorKamar, tipe, hargaPerMalam, kapasitas, dan hotel wajib diisi",
        data: null,
      });
    }

    const room = await Room.create({
      nomorKamar, tipe, hargaPerMalam, kapasitas,
      tersedia: tersedia !== undefined ? tersedia : true,
      fasilitas: fasilitas || [],
      hotel,
    });

    const populated = await room.populate("hotel", "nama bintang");
    res.status(201).json({
      status: "success",
      message: "Data berhasil ditambahkan",
      data: populated,
    });
  } catch (err) {
    next(err);
  }
};

// PUT /rooms/:id
exports.updateRoom = async (req, res, next) => {
  try {
    const { nomorKamar, tipe, hargaPerMalam, kapasitas, tersedia, fasilitas, hotel } = req.body;

    if (!nomorKamar || !tipe || hargaPerMalam === undefined || !kapasitas || !hotel) {
      return res.status(400).json({
        status: "error",
        message: "Field nomorKamar, tipe, hargaPerMalam, kapasitas, dan hotel wajib diisi",
        data: null,
      });
    }

    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { nomorKamar, tipe, hargaPerMalam, kapasitas, tersedia, fasilitas, hotel },
      { new: true, runValidators: true }
    ).populate("hotel", "nama bintang");

    if (!room) {
      return res.status(404).json({
        status: "error",
        message: `Data dengan id ${req.params.id} tidak ditemukan`,
        data: null,
      });
    }
    res.status(200).json({
      status: "success",
      message: "Data berhasil diubah",
      data: room,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /rooms/:id
exports.deleteRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).json({
        status: "error",
        message: `Data dengan id ${req.params.id} tidak ditemukan`,
        data: null,
      });
    }
    res.status(200).json({
      status: "success",
      message: `Data kamar dengan id ${req.params.id} berhasil dihapus`,
      data: null,
    });
  } catch (err) {
    next(err);
  }
};