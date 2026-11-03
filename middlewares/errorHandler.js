function notFound(req, res, next) {
  res.status(404).json({
    status: "error",
    message: "Endpoint tidak ditemukan",
    data: null,
  });
}

function errorHandler(err, req, res, next) {
  // error validasi Mongoose (field wajib, enum, dll.)
  if (err.name === "ValidationError") {
    return res.status(400).json({
      status: "error",
      message: Object.values(err.errors).map((e) => e.message).join(", "),
      data: null,
    });
  }
  // id format salah
  if (err.name === "CastError") {
    return res.status(400).json({
      status: "error",
      message: "Format id tidak valid",
      data: null,
    });
  }
  // body JSON rusak
  if (err.type === "entity.parse.failed" || err instanceof SyntaxError) {
    return res.status(400).json({
      status: "error",
      message: "Format JSON tidak valid",
      data: null,
    });
  }
  console.error(err);
  res.status(500).json({
    status: "error",
    message: "Terjadi kesalahan pada server",
    data: null,
  });
}

module.exports = { notFound, errorHandler };